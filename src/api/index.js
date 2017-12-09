import Vue from 'vue'
import axios from 'axios'

const api = {}

//  响应拦截器
axios.interceptors.response.use(response => {
    let res = response.data
    if (res.status == 1) {      //  失败
        let err = {
            msg: res.msg || '请求失败',
            status: res.status
        }
        return Promise.reject(err)
    }

    return res.result
}, error => {
    return Promise.reject(error)
})

const request = ({url, type = 'get', params}) => {
    let config = {
        method: type,
        url: url,
        baseURL: '',
    }

    if (type == 'get') {
        config.params = params
    } else {
        config.data = params
    }

    return axios(config)
}


api.checkLogin = () => {
    return request({
        url: '/users/checkLogin',
        type: 'post',
    })
}

api.login = (params) => {
    return request({
        url: '/users/login',
        type: 'post',
        params: params,
    })
}

api.logout = () => {
    return request({
        url: '/users/logout',
        type: 'post',
    })
}

api.getGoodsList = (params) => {
    return request({
        url: '/goods/list',
        type: 'get',
        params: params,
    })
}

api.addCart = (params) => {
    return request({
        url: '/goods/addCart',
        type: 'post',
        params: params,
    })
}

api.cartEdit = (params) => {
    return request({
        url: '/users/cart/edit',
        type: 'post',
        params: params,
    })
}

api.cartList = () => {
    return request({
        url: '/users/cartList',
    })
}

api.cartDel = (params) => {
    return request({
        url: '/users/cart/del',
        type: 'post',
        params: params,
    })
}



export default api