import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import {ApiContext} from "./ApiContext";
import {Friend} from "../types/friend";
import {Alert} from "react-native";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<Friend>(null);
    const [resetPasswordToken, setResetPasswordToken] = useState<string>();
    const {get, post, deleteInstances, userToken, setUserToken, setUserRefreshToken} = useContext(ApiContext)

    const resetPasswordTokenInit = () => {
        setResetPasswordToken(uuid.v4().toString())
    }

    const fetchUserData = () => {
        get('user/details', null,
            res => {
                setUserData(res.data)
                setIsLoading(false)
            },
            res => {
                setIsLoading(false)
            }
        );
    }
    const login = (email: string, password: string) => {
        setIsLoading(true)
        post('login', {
                email,
                password
            },
            res => {
                setUserToken(res.data.token)
                setUserRefreshToken(res.data.refresh_token)
                AsyncStorage.setItem('userToken', res.data.token)
                AsyncStorage.setItem('userRefreshToken', res.data.refresh_token)
                deleteInstances()
                fetchUserData()
            },
            res => {
                setIsLoading(false)
                Alert.alert("Niepoprawny email lub hasło")
            },
            true
        );
    }

    const logout = async () => {
        setIsLoading(true)
        setUserData(null)
        post('user/location/stop', null
        , ()=> {
            setUserToken(null)
            setUserRefreshToken(null)
            AsyncStorage.removeItem('userToken')
            AsyncStorage.removeItem('userRefreshToken')
            deleteInstances()
            setIsLoading(false)
        }, ()=> {
            setUserToken(null)
            setUserRefreshToken(null)
            AsyncStorage.removeItem('userToken')
            AsyncStorage.removeItem('userRefreshToken')
            deleteInstances()
            setIsLoading(false)
        })
        setIsLoading(false)
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true)
            setUserToken(await AsyncStorage.getItem('userToken'))
            setUserRefreshToken(await AsyncStorage.getItem('userRefreshToken'))
        } catch (e) {
            console.log(`isLoggedIn error ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    useEffect(() => {
        if (!userToken) {
            setIsLoading(false)
            setUserData(null)
            return
        }
        post('auth-ping', null
            , ()=> {
                fetchUserData()
            }, (res)=> {
                setUserToken(null)
                setUserRefreshToken(null)
                AsyncStorage.removeItem('userToken')
                AsyncStorage.removeItem('userRefreshToken')
                deleteInstances()
            })
    }, [userToken])

    return (
        <AuthContext.Provider value={{login, logout, isLoading, resetPasswordToken, resetPasswordTokenInit, userData, fetchUserData}}>
            {children}
        </AuthContext.Provider>
    );
}