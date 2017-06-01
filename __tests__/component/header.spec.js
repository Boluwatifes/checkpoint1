import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../src/app/components/Header';
import NotLoggedIn from '../../src/app/components/header/NotLoggedIn';
import LoggedIn from '../../src/app/components/header/LoggedIn';
import localStorageMock from '../../src/app/__mock__/localStorage';

window.localStorage = localStorageMock;

describe('Header Component', () => {
  describe('Test for sessions', () => {
    it('should display <NotLoggedIn /> component if the user is not logged in', () => {
      const wrapper = shallow(<Header />);
      expect(wrapper.node.type).toEqual(NotLoggedIn);
    });

    it('should display <LoggedIn /> component if the user is logged in', () => {
      window.localStorage.setItem('user', JSON.stringify({
        name: 'Bamidele Daniel',
        email: 'andela-dbamidele@andela.com',
        id: 458655605656956,
      }));
      const wrapper = shallow(<Header />);
      expect(wrapper.node.type).toEqual(LoggedIn);
    });
  });
});
