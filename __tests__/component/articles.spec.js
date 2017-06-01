import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import '../../src/app/test_files/firebase-config';

import Articles from '../../src/app/components/Articles';
import localStorageMock from '../../src/app/__mock__/localStorage';
import articlesMock from '../../src/app/__mock__/articles';
// import sampleArticles from '../../src/app/__mock__/sampleArticles.json';

jest.dontMock('../../src/app/utils/helpers');

window.localStorage = localStorageMock;
const articles = articlesMock;
describe('Articles', () => {
  let wrapper;

  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    }));
    window.localStorage.setItem('articles', JSON.stringify([
      {
        title: 'Hello World',
        source: 'bbc-news',
        description: 'This is so cool',
        url: 'https://newsninja.herokuapp.com',
        urlToImage: '',
        author: 'Bamidele Daniel',
        publishedAt: '',
      },
    ]));
    window.localStorage.setItem('defaultNews', 'aljazerra');
    wrapper = mount(<Articles articles={[]} />);
  });
  it('renders without crashing', () => {
    mount(<Articles />);
  });

  it('changes state on store changes', () => {
    expect(wrapper.instance().state).toEqual({ articles: [], loading: true, });
    wrapper.instance().setArticles(articles);
    expect(wrapper.instance().state).toEqual({ articles, loading: false, });
  });

  it('calls componentWillReceiveProps and update the state', () => {
    const spy = sinon.spy(Articles.prototype, 'componentWillReceiveProps');
    expect(spy.calledOnce).toEqual(false);
    wrapper.setProps(articles);
    expect(spy.calledOnce).toEqual(true);
  });

  it('contains a saveUsersFavorites method', () => {
    expect(wrapper.instance().saveUsersFavorites(0)).toEqual(undefined);
  });

  it('saves favorite on button click', () => {
    const spy = sinon.spy(Articles.prototype,
    'saveUsersFavorites');
    const shallowWrapper = shallow(<Articles />);
    shallowWrapper.instance().componentWillReceiveProps({ articles });
    shallowWrapper.find('#addFav').simulate('click');
    expect(spy.calledOnce).toBeTruthy();
  });

  it('deletes favorite on button click', () => {
    const deleteFavorite = sinon.stub();
    const shallowWrapper = shallow(<Articles
      type="favorite"
      deleteFavorite={deleteFavorite}
    />);
    shallowWrapper.instance().componentWillReceiveProps({ articles });
    shallowWrapper.find('#deleteFav').simulate('click');
    expect(deleteFavorite.calledOnce).toBeTruthy();
  });
});

