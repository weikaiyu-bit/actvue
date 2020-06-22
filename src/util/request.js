
import qs from 'qs';
import Vue from 'vue';
let vm = new Vue();
export default function request(url, payload) {

  switch (payload.methods) {
    case 'GET':
      vm.$axios.get(url, payload.data).then(res => {
        return res.data;
      }).catch(err => {
        return err;
      })
      break;
    case 'POST':
      if (payload.formData && payload.formData == 'form') {
        vm.$axios.post(url, qs.stringify(payload.data)).then(res => {
          return res.data;
        }).catch(err => {
          return err;
        })
      } else {
        return vm.$axios.post(url, payload.data).then(res => {
          return res.data;
        }).catch(err => {
          return err;
        })
      }
      break;
    default:
      vm.$axios.post(url, payload.data).then(res => {
        return res.data;
      }).catch(err => {
        return err;
      })
      break;
  }

}





