import React from 'react';
import renderer from 'react-test-renderer';
import Test from './Test';

describe("Testing", () => {
    it.skip("Should blah blah", () => {
        const tree = renderer.create(<Test />);
    });
});