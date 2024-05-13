import React from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import ChatList from "../../../src/components/ChatList";
import {Friend} from "../../../src/types/friend";
import {ChatMessage} from "../../../src/types/chat";
import {NavigationContext} from "../../../src/context/NavigationContext";
import Avatar from "../../../src/components/Avatar";

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: mockedNavigate,
        }),
    };
});
test('empty', () => {
    const tree = renderer.create(
        <ChatList data={[
            {
                title: "Chaty",
                data: [],
            },
        ]}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('one chat', () => {
    const tree = renderer.create(
        <ChatList data={[
            {
                title: "Chaty",
                data: [{
                    id: 1,
                    name: "name",
                    event_name: "event_name",
                    participants: [],
                    is_seen: true,
                    messages: [],
                    last_message_date: '2024-01-01 11:22',
                }],
            },
        ]}/>
    )
    expect(tree).toMatchSnapshot();
});



test('multiple chats', () => {
    const tree = renderer.create(
        <ChatList data={[
            {
                title: "Chaty",
                data: [{
                    id: 1,
                    name: "name",
                    event_name: "event_name",
                    participants: [],
                    is_seen: true,
                    messages: [],
                    last_message_date: '2024-01-01 11:22',
                },{
                    id: 2,
                    name: "name",
                    event_name: "event_name",
                    participants: [],
                    is_seen: true,
                    messages: [],
                    last_message_date: '2024-01-01 11:22',
                },{
                    id: 3,
                    name: "name",
                    event_name: "event_name",
                    participants: [],
                    is_seen: true,
                    messages: [],
                    last_message_date: '2024-01-01 11:22',
                }],
            },
        ]}/>
    )
    expect(tree).toMatchSnapshot();
});