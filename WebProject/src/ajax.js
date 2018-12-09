/**
 * @author: 王雨田
 * @create: 2018/8/21
 * @describe: 有色金属公共ajax配置
 */
"use strict";
import axios from 'axios';
import * as Cookies from 'tiny-cookie'
import Qs from 'qs';
import router from './router';

var ajax = axios.create({
  baseURL: '',
  // headers: {'token': TOKEN || '','Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  //`transformResponse`选项允许我们在数据传送到`then/catch`方法之前对数据进行改动
  transformResponse:[function(data){
    //在这里根据自己的需求改变数据
    var temData = JSON.parse(data);
    console.log(temData);
    if(!temData.status){
      if(temData.code == 200){
        return temData
      }else{
        this.$layer.msg(temData.msg);
      }
    }else if(temData.status==500){
    	
      Cookies.remove('ADMINTOKEN');
//    router.replace({path:'/login'});
    }else if(temData.status==401){
      Cookies.remove('ADMINTOKEN');
//    router.replace({path:'/login'});
      return;
    }
    
    // console.log(temData);
    // return temData;
  }],
  transformRequest:[function(data){
    //在这里根据自己的需求改变数据
    // console.log(data);
    var data = Qs.stringify(data);
    return data;
    // console.log(temData);
    // return temData;
  }],
});

//添加一个请求拦截器
ajax.interceptors.request.use(function(config){
  //在请求发出之前进行一些操作
  let TOKEN = Cookies.get('ADMINTOKEN')||'';
  config.headers.Authorization = TOKEN;
  // loading = layer.load(1, {
  //   shade: [0.3,'#000'] //0.1透明度的白色背景
  // });
  // if (TOKEN == null || TOKEN == 'undefined') {
  //   router.replace({path:'/'});
  // }
  return config;
},function(err){
  // layer.close(loading);
  //Do something with request error
  return Promise.reject(err);
});

export default ajax;
