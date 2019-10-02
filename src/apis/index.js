import axios from 'axios'

const instance=axios.create({
    baseURL:'http://192.168.0.103:5896/'
})

const loginGoogle=(token,source)=>{
    return instance.post('v1/auth/loginsocial',{token,source})
}

export default {
    loginGoogle
}