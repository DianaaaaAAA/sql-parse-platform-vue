import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login', // 后端接口url
    //如果需要指定后端，还需要定义baseURL
    // baseURL:'http://localhost:****',
    // url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',//对应login也要做修改
    // url: '/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
