import React, {useState} from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import NotificationList from "../../../src/components/NotificationList";
import {FriendsContext} from "../../../src/context/FriendsContext";
import {ApiContext} from "../../../src/context/ApiContext";
import {EventsContext} from "../../../src/context/EventsContext";
import {NavigationContext} from "../../../src/context/NavigationContext";

test('renders empty', () => {
    const tree = renderer.create(<NotificationList inviteData={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders multiple', () => {
    const get = async (endpoint, params? = null, success = null, error = null, noAuth = false, customConfig = null)=> {}
    const post = async (endpoint, params? = null, success = null, error = null, noAuth = false, customConfig = null)=> {}

    const getPendingEventInvites = ()=>{}
    const loadAllEvents = ()=>{}
    const clearSearchEvents = ()=>{}
    const friends = [];
    const userToken = null;
    const navigationRef = React.createRef();

    const tree = renderer.create(
        <NavigationContext.Provider value={{navigationRef}}>
            <ApiContext.Provider value={{get, post, userToken}}>
                    <FriendsContext.Provider value={{friends}}>
                        <EventsContext.Provider value={{ getPendingEventInvites, loadAllEvents, clearSearchEvents}}>
                            <NotificationList inviteData={[
                                {
                                    title: "Zaproszenia na wydarzenia",
                                    data: [
                                        {
                                            id: 1,
                                            title: "title",
                                            notificationType: 'eventInvite',
                                            eventInvite: {
                                                id: 1,
                                                status: "new",
                                                event: {id:1},
                                            }
                                        }
                                    ],
                                },{
                                    title: "Zaproszenia do znajomych",
                                    data: [
                                        {
                                            id: 1,
                                            title: "title",
                                            notificationType: 'friendInvite',
                                            friendInvite: {
                                                id: 1,
                                                friend: {id:1},
                                                status: "new",
                                            }
                                        }
                                    ],
                                },
                        ]} />
                        </EventsContext.Provider>
                    </FriendsContext.Provider>
            </ApiContext.Provider>
        </NavigationContext.Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});