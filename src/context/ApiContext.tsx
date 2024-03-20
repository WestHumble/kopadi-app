import React, {createContext, useState} from 'react';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
export const ApiContext = createContext(null);

const API_ADDRESS = process.env.EXPO_PUBLIC_API_URL;
export const ApiProvider = ({children}) => {
    const [userToken, setUserToken] = useState<string>();
    const [userRefreshToken, setUserRefreshToken] = useState<string>();
    let axiosAuthInstance, axiosNoAuthInstance

    const deleteInstances = ()=>{
        axiosAuthInstance = null
        axiosNoAuthInstance = null
    }
    async function getInstance(noAuth, successCallback, errorCallback) {
        if (noAuth) {
            if (!axiosNoAuthInstance) {
                axiosNoAuthInstance = axios.create({
                    baseURL: `${API_ADDRESS}`,
                })
            }
            return axiosNoAuthInstance
        }
        if (!axiosAuthInstance) {
            axiosAuthInstance = axios.create({
                baseURL: `${API_ADDRESS}`,
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            })
            axiosAuthInstance.interceptors.response.use(
                response => {
                    return response;
                },
                error => {
                    if (error.request && error.request.status !== 401) {
                        throw error;
                    }
                    let failedRequest = error.config;
                    axios.create({
                        baseURL: `${API_ADDRESS}`,
                    }).post('api/token/refresh', {
                        refresh_token: userRefreshToken
                    }).then((res)=>{
                        setUserToken(res.data.token)
                        setUserRefreshToken(res.data.refresh_token)
                        axiosAuthInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.token;
                        failedRequest.headers['Authorization'] = 'Bearer ' + res.data.token;

                        return axios.request(failedRequest)
                            .then(res => {
                                if (!res || null === successCallback){
                                    return
                                }
                                successCallback(res)
                            })
                            .catch(res => {
                                if (!res || null === errorCallback){
                                    return
                                }
                                errorCallback(res)
                            })
                    }).catch((res)=>{
                        console.error("Unable to refresh token")
                        if (!res || null === errorCallback){
                            return
                        }
                        errorCallback(res)
                    })
                },
            );
        }
        return axiosAuthInstance
    }
    const post = async (endpoint, body? = null, success = null, error = null, noAuth = false)=> {
        if (!noAuth && !userToken){
            return
        }
        (await getInstance(noAuth, success, error)).post(`/api/${endpoint}`, body).then(res => {
            if (!res || null === success){
                return
            }
            success(res)
        }).catch(res => {
            if (!res || null === error){
                return
            }
            error(res)
        })
    }
    const get = async (endpoint, params? = null, success = null, error = null, noAuth = false)=> {
        if (!noAuth && !userToken){
            return
        }
        (await getInstance(noAuth, success, error)).get(`/api/${endpoint}`, {
            params: params
        }).then(res => {
            if (!res || null === success){
                return
            }
            success(res)
        }).catch(res => {
            if (!res || null === error){
                return
            }
            error(res)
        })
    }
    return (
        <ApiContext.Provider value={{post, get, deleteInstances, userToken, setUserToken, setUserRefreshToken}}>
            {children}
        </ApiContext.Provider>
    );
}