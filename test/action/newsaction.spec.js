import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { getSources, getArticles } from '../../src/app/actions/NewsAction';

describe('Test for News API', () => {
  it('It should contain a method that gets all news sources', () => {
    expect(getSources).to.be.function;
  });

  it('It should contain a method that gets news articles', () => {
    expect(getArticles).to.be.function;
  });
});
