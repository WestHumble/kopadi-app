import React, {useState} from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import CustomInput from "../../../src/components/CustomInput";

test('renders correctly', () => {
    const tree = renderer.create(<CustomInput
        placeholder="Name"
        value={"value"}
        setValue={()=>{}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
});                                                                                                  ``