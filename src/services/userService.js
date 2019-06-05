import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { AsyncStorage } from 'react-native';
import qs from 'qs';

import {API_URL} from '../config/constants';
const userService = {
    register(user) {
        const data =qs.stringify(user);

        return axios.post(`${API_URL}/auth/signup`, data, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then((response) => {
            return response.data;
        })/*.catch((error) => {
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx

                console.log('first case');
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('second case');
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('third case');
                console.log('Error', error.message);
            }
            
            // console.log(error.config);
            // throw new Error(error.response);
        })*/;
    },

    async setPushToken(pushToken) {
        const authToken = await AsyncStorage.getItem('id_token');
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        
        const data =qs.stringify({pushToken: pushToken});

        return axios.post(`${API_URL}/auth/update_pushtoken`, data, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${authToken}`
        }}).then((response) => {
            console.log("push token response = " + response);
            return response.data;
        },(error) => { console.log(error) }).catch((error) => {
            console.log('error push token');
            console.log(error);
        });
    },

    login(email, password) {
        const reqObj = {
            email: email,
            password: password
        };
        const data = qs.stringify(reqObj);
        console.log(`${API_URL}/auth/login`);
        return axios.post(`${API_URL}/auth/login`, data, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then((response) => {
            if (response.data.success) {
                deviceStorage.saveKey("id_token", response.data.authToken);
                deviceStorage.saveKey("refresh_token", response.data.refreshToken);
                deviceStorage.saveKey("email", email);
            }
            return response.data;
        })
    } , 

    async getCurrentEmail() {
        const email = await AsyncStorage.getItem('email');
        return email;
    },
    async logout() {
        deviceStorage.saveKey("id_token", '');
        deviceStorage.saveKey("refresh_token", '');
        deviceStorage.saveKey("email", '');
    },
    async refreshToken() {
        const authToken = await AsyncStorage.getItem('id_token');
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        const email = await AsyncStorage.getItem('email');
        if (authToken && refreshToken) {
            const data = qs.stringify({refreshToken: refreshToken});

            try {
                const response = await axios.post(`${API_URL}/auth/refreshToken`, data, { 
                    headers: {
                    'Authorization': `Bearer ${authToken}`
                    }
                });

                if (response.data.success) {
                    deviceStorage.saveKey("id_token", response.data.authToken);
                    return true;
                }
            } catch (err) {
                console.log('failed refresh token');
                return false;
            }
        }
        return false;
    },
    async getProfile() {
        const token = await AsyncStorage.getItem('id_token');

        return axios.get(`${API_URL}/auth/get_my_profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.data;
        });
    },
    async updateProfile(profile) {
        const token = await AsyncStorage.getItem('id_token');

        const data = qs.stringify(profile);

        return axios.post(`${API_URL}/auth/update_profile`, data, { 
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            return response.data;
        });
    }, 
    async sendForgotPassword(email) {
        const token = await AsyncStorage.getItem('id_token');

        const data = qs.stringify({
            email: email
        });

        return axios.post(`${API_URL}/auth/forgotten`, data, { 
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            return response.data;
        });
    }
};

export default userService;