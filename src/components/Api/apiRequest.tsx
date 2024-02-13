import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function post (endpoint, body = null) {
    return axios.post(`http://localhost:81/api/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`,
        },
        body
    })
}

export async function get (endpoint) {
    return axios.get(`http://localhost:81/api/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`,
        }
    })
}