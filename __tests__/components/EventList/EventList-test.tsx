import React, {useState} from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import EventList from "../../../src/components/EventList";
import ChatList from "../../../src/components/ChatList";

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
test('renders empty', () => {
  const tree = renderer.create(<EventList data={[
    {
      title: "Moje",
      data: [],
    },
    {
      title: "Zaproszone",
      data: [],
    },
    {
      title: "Publiczne",
      data: [],
    },
  ]} />).toJSON();
  expect(tree).toMatchSnapshot();
});


test('renders with items', () => {
  const tree = renderer.create(<EventList data={[
    {
      title: "Moje",
      data: [{
        id: 1,
        user_id: 1,
        latlng: null,
        name: "name",
        description: "description",
        title: "title",
        date: "2024-01-01 11:22",
        address: "address",
        invite_status: "new",
      }],
    },
    {
      title: "Zaproszone",
      data: [{
        id: 2,
        user_id: 1,
        latlng: null,
        name: "name",
        description: "description",
        title: "title",
        date: "2024-01-01 11:22",
        address: "address",
        invite_status: "new",
      }],
    },
    {
      title: "Publiczne",
      data: [{
        id: 3,
        user_id: 1,
        latlng: null,
        name: "name",
        description: "description",
        title: "title",
        date: "2024-01-01 11:22",
        address: "address",
        invite_status: "new",
      }],
    },
  ]} />).toJSON();
  expect(tree).toMatchSnapshot();
});