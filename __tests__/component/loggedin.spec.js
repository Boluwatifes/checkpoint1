import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LoggedIn from '../../src/app/components/header/LoggedIn';
import localStorageMock from '../../src/app/__mock__/localStorage';

window.localStorage = localStorageMock;

describe('LoggedIn component', () => {
  let wrapper;

  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    }));
    wrapper = shallow(<LoggedIn />);
  });

  describe('Test for component', () => {
    it('should render a header', () => {
      expect(wrapper.node.type).toEqual('header');
    });
  });

  describe('Test for user log out', () => {
    it('should log a user out on click', () => {
      const e = {
        type: 'click',
        preventDefault: sinon.spy(),
      };
      wrapper.instance().handleLogOut(e);
      expect(e.preventDefault.calledOnce).toBeTruthy();
      window.localStorage.clear();
      expect(window.localStorage.getItem('user')).toEqual(undefined);
    });
  });
});
