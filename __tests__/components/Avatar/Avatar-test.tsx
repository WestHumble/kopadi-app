import React from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import Avatar from "../../../src/components/Avatar";
import {NavigationContext} from "../../../src/context/NavigationContext";

test('renders correctly', () => {
    const navigationRef = React.createRef();

    const tree = renderer.create(
        <NavigationContext.Provider value={{navigationRef}}>
            <Avatar
                userId={1}
                userName="userName"
                userSurname="userSurname"
            />
        </NavigationContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});