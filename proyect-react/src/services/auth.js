import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

class AuthService{
    login (usuario, password){
        return axios.post(API_URL+ "login",{
            username : usuario,
            password : password
        }).then(res=>{
            if(res.data.access){
                localStorage.setItem('token',JSON.stringify(res.data.access));
            }
            return res.data
        })
    }
    getToken(){
        return JSON.parse(localStorage.getItem('token'))
    }
    destroyToken(){
        localStorage.removeItem('token')
    }
}
export default new AuthService();