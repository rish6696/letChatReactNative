import axios from 'axios'
import Constants from '../constants';

const instance=axios.create({
    baseURL:Constants.SERVER_URL
})

const loginGoogle=(token,source)=>{
    return instance.post('v1/auth/loginsocial',{token,source})
}

const fetchUsers=(pgNo,JWT_TOKEN)=>{
    return instance.post('v1/fetch/getUsers/'+pgNo,{JWT_TOKEN})
}

export default {
    loginGoogle,fetchUsers
}