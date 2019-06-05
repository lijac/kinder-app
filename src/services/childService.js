import axios from 'axios';
import { AsyncStorage } from 'react-native';
import deviceStorage from '../services/deviceStorage';
import qs from 'qs';

import {API_URL} from '../config/constants';

const childService = {
    async getChildrenList() {
        const token = await AsyncStorage.getItem('id_token');

        return axios.get(`${API_URL}/auth/child/getMyChildren`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.data;
        });
    },

    async addChild(child) {
        const token = await AsyncStorage.getItem('id_token');

        const data = new FormData();
        data.append('name', child.childName); // you can append anyone.
        data.append('bandId', child.wristbandId); // you can append anyone.
        data.append('activationCode', child.activationCode); // you can append anyone.
        if (child.imagePhoto) {
            data.append('photo', {
                uri: child.imagePhoto,
                type: 'image/jpeg', // or photo.type
                name: 'testPhotoName'
            });
        }
        
        return axios.post(`${API_URL}/auth/child/add`, data, { 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            return response.data;
        });
    },

    async editChild(child) {
        const token = await AsyncStorage.getItem('id_token');

        const data = new FormData();
        data.append('name', child.name); // you can append anyone.
        data.append('bandId', child.bandId); // you can append anyone.
        data.append('activationCode', child.activationCode); // you can append anyone.
        if (child.imagePhoto) {
            data.append('photo', {
                uri: child.imagePhoto,
                type: 'image/jpeg', // or photo.type
                name: 'testPhotoName'
            });
        }

        return axios.post(`${API_URL}/auth/child/update/${child._id}`, data, { 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            return response.data;
        });;
    },

    async getChild(childId) {
        const token = await AsyncStorage.getItem('id_token');

        return axios.get(`${API_URL}/auth/child/getMyChild/${childId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.data;
        });
    },

    async deleteChild(childId) {
        const token = await AsyncStorage.getItem('id_token');
        return axios.get(`${API_URL}/auth/child/delete/${childId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.data;
        });
    }
};

export default childService;