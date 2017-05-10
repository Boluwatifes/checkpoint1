import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Header from '../src/app/components/Header';
import Layout from '../src/app/components/Layout';

describe('<Layout />', () => {
  it('renders one <Header /> components', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find('.icon-star')).to.have.length(1);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    );
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <Foo onButtonClick={onButtonClick} />
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});

