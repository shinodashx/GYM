import axios from 'axios'

const successCode = 0
const unauthorizedCode = 61

// create an axios instance
const service = axios.create({
  baseURL: 'http://101.42.160.53:16800/', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.withCredentials = true
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    // //   config.headers['X-Token'] = getToken()
    //   config.withCredentials = true
    // },
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    console.log(response)
    const res = response.data
    if (res.code === unauthorizedCode) {
      uni.showToast({
        title: 'Please login first',
        icon: 'none'
      })
      uni.navigateTo({
        url: '/pages/profile/unLoginProfile'
      })
    } else if (res.code !== successCode) {
      uni.showToast({
        title: res.message,
        icon: 'none'
      })
    } else {
      // uni.showToast({
      //   title: 'success',
      //   icon: 'none'
      // })

      return res
    }
    error => {
      uni.showToast({
        title: 'error',
        icon: 'none'
      })
      return Promise.reject(error)
    }
  }
)

export default service
