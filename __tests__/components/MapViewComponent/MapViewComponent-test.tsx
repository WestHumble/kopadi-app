import React from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import MapViewComponent from "../../../src/components/MapViewComponent/MapViewComponent";
import {EventsContext} from "../../../src/context/EventsContext";
import {LocationContext} from "../../../src/context/LocationContext";
import {FriendsContext} from "../../../src/context/FriendsContext";
import {ApiContext} from "../../../src/context/ApiContext";

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: () => ({
      isFocused: true,
    }),
  };
});
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  const React = require('react');

  const MockMapView = React.forwardRef(
      ({ testID, children, ...props }, ref) => {
        if (ref?.current) {
          ref.current = {
            getMapBoundaries: async () => ({
              northEast: {
                latitude: 2,
                longitude: 2,
              },
              southWest: {
                latitude: 1,
                longitude: 1,
              },
            }),
            getCamera: async () => ({
              center: {
                latitude: 2,
                longitude: 2,
              },
              heading: 1,
              pitch: 1,
              zoom: 1,
              altitude: 1,
            }),
            animateCamera: () => {},
          };
        }
        return (
            <View testID={testID} {...props}>
              {children}
            </View>
        );
      },
  );

  const MockMarker = React.forwardRef(({ testID, children, ...props }, ref) => {
    if (ref?.current) {
      ref.current = {
        redraw: () => {},
      };
    }

    return (
        <View testID={testID} {...props}>
          {children}
        </View>
    );
  });

  const mockMapTypes = {
    STANDARD: 0,
    SATELLITE: 1,
    HYBRID: 2,
    TERRAIN: 3,
    NONE: 4,
    MUTEDSTANDARD: 5,
  };

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    MAP_TYPES: mockMapTypes,
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});
test('renders correctly', () => {
  const eventsCreated = [];
  const eventsInvited = [];
  const eventsOther = [];
  const eventsCreatedSearch = [];
  const eventsInvitedSearch = [];
  const eventsOtherSearch = [];
  const isSearchActive = false;
  const userLocation = null;
  const friends = [];
  const userToken = null;

  const eventsRef = {current: []}
  const friendsRef = {current: []}
  const mapViewRef = {current: null}
  const get = async (endpoint, params? = null, success = null, error = null, noAuth = false, customConfig = null)=> {}
  const loadCloseEvents = ()=>{}
  const clearSearchEvents = ()=>{}

  const tree = renderer.create(
      <ApiContext.Provider value={{get, userToken}}>
        <LocationContext.Provider value={{userLocation,eventsRef,friendsRef,mapViewRef}}>
          <FriendsContext.Provider value={{friends}}>
            <EventsContext.Provider value={{eventsCreated,
              eventsInvited,
              eventsOther,
              eventsCreatedSearch,
              eventsInvitedSearch,
              eventsOtherSearch,
              loadCloseEvents,
              clearSearchEvents,
              isSearchActive}}>
              <MapViewComponent/>
            </EventsContext.Provider>
          </FriendsContext.Provider>
        </LocationContext.Provider>
      </ApiContext.Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});