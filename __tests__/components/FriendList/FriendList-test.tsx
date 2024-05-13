import React, {useState} from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import FriendList from "../../../src/components/FriendList";
import {NavigationContext} from "../../../src/context/NavigationContext";
import Avatar from "../../../src/components/Avatar";
test('renders empty', () => {
    const tree = renderer.create(<FriendList
    data={[]}
    noDataText={"Brak znajomych"}
    action={(friend) => {}}
    actionText={(friend) => {return "Usuń";}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders multiple', () => {
    const navigationRef = React.createRef();

    const tree = renderer.create(
        <NavigationContext.Provider value={{navigationRef}}>
            <FriendList
                data={[
                    {
                        title: "Znajomi",
                        data: [{
                            id: 1,
                            name: "name",
                            surname: "surname",
                            email: "email",
                        },{
                            id: 2,
                            name: "name",
                            surname: "surname",
                            email: "email",
                        }],
                    },
                ]}
                noDataText={"Brak znajomych"}
                action={(friend) => {}}
                actionText={(friend) => {return "Usuń";}}
            />
        </NavigationContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
