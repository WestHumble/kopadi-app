import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_ADDRESS = 'https://warm-turtles-wink.loca.lt';

async function getInstance(noAuth) {
    if (noAuth) {
        return axios.create({
            baseURL: `${API_ADDRESS}`,
        })
    }
    return axios.create({
        baseURL: `${API_ADDRESS}`,
        headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`,
        }
    })
}
export async function post (endpoint, body, noAuth = false) {
    return (await getInstance(noAuth)).post(`/api/${endpoint}`, body)
}

export async function get (endpoint, noAuth = false) {
    return (await getInstance(noAuth)).get(`/api/${endpoint}`)
}