import axios from 'axios'
import Vue from 'vue'



const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE
});


// instance.defaults.headers.common['SOMETHING'] = 'something';

const reqInterceptor = instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${ token }`;
  return config
})
const resInterceptor = instance.interceptors.response.use(
  response => response,
  function (error) {
    const errorObject = error.response;
    console.log('Axios INCERCEPTOR error', errorObject);
    if (errorObject.status !== 404) {
      let swal_props = {
        icon: 'error',
        html: null
      };

      if (errorObject.status == 406) {
        swal_props.html = errorObject.data.message + '<hr>' + errorObject.data.errors.join('<br>');
      } else {
        swal_props.html = 'Error: ' + errorObject.status + ' - ' + errorObject.statusText;
      }
      Vue.swal(swal_props);
    } else {
      Vue.swal({
        html: 'use router to redirect to 404 page'
      });

    }
    return error
  }
);

export default instance;