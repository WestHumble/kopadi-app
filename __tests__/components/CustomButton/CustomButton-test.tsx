import React from 'react';
import renderer from 'react-test-renderer';
import CustomButton from "../../../src/components/CustomButton";
import { expect, test } from '@jest/globals';

test('renders correctly', () => {
  const tree = renderer.create(<CustomButton
      text="Test"
      onPress={undefined}
      type="PRIMARY"
      bgColor={undefined}
      fgColor={undefined}
      additionalStyles={undefined}
      additionalStylesText={undefined}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});


test('renders with function', () => {
  const tree = renderer.create(<CustomButton
      text="Test"
      onPress={()=>{}}
      type="PRIMARY"
      bgColor={undefined}
      fgColor={undefined}
      additionalStyles={undefined}
      additionalStylesText={undefined}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});