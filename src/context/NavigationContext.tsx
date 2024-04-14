import React, {createContext, useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";
import {ApiContext} from "./ApiContext";
import * as Notifications from "expo-notifications";
import {AppState, Platform} from "react-native";
import * as Device from "expo-device";

export const NavigationContext = createContext(null);
export const NavigationProvider = ({children}) => {
    const navigationRef = React.createRef();

    return (
        <NavigationContext.Provider value={{navigationRef}}>
            {children}
        </NavigationContext.Provider>
    );
}