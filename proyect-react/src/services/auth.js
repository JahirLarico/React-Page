import axios from 'axios';

const API_URL = 'https://apidjango.frankalvarez.dev/';

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