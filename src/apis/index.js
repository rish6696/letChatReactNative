import axios from 'axios'

const instance=axios.create({
    baseURL:'http://demoauth.chickenkiller.com:5896/'
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