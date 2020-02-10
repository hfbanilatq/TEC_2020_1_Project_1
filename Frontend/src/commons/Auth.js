//import router from '../router';
import axios from 'axios';
// import router from '../router/index';
const state = {
    token: localStorage.getItem('token') || '' ,
    user:{},
    status: ''
};

const getters ={
//   isLoggedIn: (state) => {
//         if(state.token != '') {
//             return true
//         } else {
//             return false
//         }
//     }
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user
};



const actions = {
//Login Action
    async login (
        {commit}, 
        user){
        commit('auth_request');
        const res = await axios.post('/users/login', user);
            alert(res.data.sucess);
        if (!res.data.Sucess) {
            const token = res.data.token;
            const user = res.data.user;

            //Guardando el token en el local storage
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success', token, user);
        }
        return res;
    },
    async register( {
        commit
    }, userData ) {
        commit('register_request');
        const res = await axios.post('/users/register', userData);

        if(res.data.sucess){
            alert('');
        }
    }
};
const mutations = {
    auth_request(state) {
        state.status= 'loading'
    },
    auth_success(state, token, user){
        state.token= token
        state.user = user
        state.status = 'Sucess'
    }

};

export default {
    state,
    getters,
    mutations,
    actions
}