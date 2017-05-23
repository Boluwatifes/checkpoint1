import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';
import ReadArticle from '../../src/app/components/ReadArticle';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} = ShareButtons;

global.localStorage = window.localStorage;
const setup = () => {
  const component = mount(
    <ReadArticle location={{ search: 'https://newsninja.com/articles?url=http://edition.cnn.com/2017/05/23/europe/manchester-terror-attack-uk/index.html' }} />
  );
  return {
    component,
  };
};

describe('Test for <ReadArticle /> component', () => {
  it('should return an instance of a class', () => {
    const { component } = setup();
    const inst = component.instance();
    expect(inst).to.be.instanceOf(ReadArticle);
  });

  it('calls componentWillMount', () => {
    sinon.spy(ReadArticle.prototype, 'componentWillMount');
    const { component } = setup();
    expect(ReadArticle.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  it('calls componentDidMount', () => {
    sinon.spy(ReadArticle.prototype, 'componentDidMount');
    const { component } = setup();
    expect(ReadArticle.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('contains a Facebook share button', () => {
    const { component } = setup();
    expect(component.find(FacebookShareButton)).to.be.truthy;
  });

  it('contains a Twitter share button', () => {
    const { component } = setup();
    expect(component.find(TwitterShareButton)).to.be.truthy;
  });

  it('contains a LinkedIn share button', () => {
    const { component } = setup();
    expect(component.find(LinkedinShareButton)).to.be.truthy;
  });

  it('contains a GooglePlus share button', () => {
    const { component } = setup();
    expect(component.find(GooglePlusShareButton)).to.be.truthy;
  });

  it('contains a Whatsapp share button', () => {
    const { component } = setup();
    expect(component.find(WhatsappShareButton)).to.be.truthy;
  });

  it('contains a Pinterest share button', () => {
    const { component } = setup();
    expect(component.find(PinterestShareButton)).to.be.truthy;
  });

  it('renders an article div', () => {
    const { component } = setup();
    expect(component.find('.portal')).to.have.length(1);
  });

  it('renders to the browser', () => {
    const { component } = setup();
    expect(component.instance().render()).to.be.defined;
  });  
});
