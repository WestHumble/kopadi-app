import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { login as loginPost } from "../components/Api/login";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string>();

    const login = (email: string, password: string) => {
        setIsLoading(true)
        loginPost(email, password).then(res => {
            setUserToken(res.data.token)
            AsyncStorage.setItem('userToken', res.data.token) 
            setIsLoading(false)
        }).catch(res => {
            console.error(res) 
            setIsLoading(false)
        })
        // axios.post(`http://localhost:81/api/login`, {
        //     email,
        //     password
        // }).then(res => {
        //     setUserToken(res.data.token)
        //     AsyncStorage.setItem('userToken', res.data.token) 
        //     setIsLoading(false)
        // }).catch(res => {
        //     console.error(res) 
        //     setIsLoading(false)
        // })
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            setUserToken(userToken == 'null' ? null : userToken)
            setIsLoading(false)
        } catch (e){
            console.log(`isLoggedIn error ${e}`)
        }

    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}