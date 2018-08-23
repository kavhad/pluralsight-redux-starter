import React from 'react';
import expect from 'expect';
import * as selectors from './selectors';

describe('Author Selectors', () => {
  it('authorFormatterForDropdown', () => {
    const authors = [
      {firstName:'Kaveh', lastName:'Hadjari', id:'kaveh-hadjari'},
      {firstName:'Laya', lastName:'Sadegh', id:'laya-sadegh'}
    ];

    const output = selectors.authorsFormattedForDropdown(authors);

    expect(output.length).toBe(2);
    expect(output[0].text).toBe('Kaveh Hadjari');
    expect(output[0].value).toBe('kaveh-hadjari');
    expect(output[1].text).toBe('Laya Sadegh');
    expect(output[1].value).toBe('laya-sadegh');

  });
});
