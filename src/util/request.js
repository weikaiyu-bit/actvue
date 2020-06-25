
import qs from 'qs';
import Vue from 'vue';
let vm = new Vue();
export default function request(url, payload) {

  switch (payload.methods) {
    case 'GET':
      var urlalter = "";
      for (var k in payload) {
        urlalter += k + "=" + payload[k] + "&"
      }
      urlalter = urlalter.split("GET&")[1];
      return new Promise((resolve,reject)=>{
      vm.$axios.get(url + "?" + urlalter.substring(0, urlalter.length - 1)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      })
      })
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





