import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_ADDRESS = 'https://silly-dancers-ask.loca.lt'

async function getInstance() {
    return axios.create({
        baseURL: `${API_ADDRESS}`,
        headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`,
        }
    })
}
export async function post (endpoint, body = null) {
    return (await getInstance()).post(`/api/${endpoint}`, body)
}

export async function get (endpoint) {
    return (await getInstance()).get(`/api/${endpoint}`)
}