<template>
	<div id="login">
		<div class="bg-top">

		</div>
		<el-form :model="loginForm" class="main">
			<el-input v-model="loginForm.phone" prefix-icon="el-icon-dj-webicon205" class="input-top" placeholder="请输入手机号码"></el-input>
			<!--<el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-dj-mima" class="input-bottom" placeholder="请输入登陆密码"></el-input>-->
			<!--<div @click="forgetPassword" class="forgetPassword">忘记密码</div>-->

			<div class="verCodeWrapper">
				<el-input v-model="loginForm.verCode" class="verCode" placeholder="请输入验证码"></el-input>
				<el-button @click="getVerCode" class="btn-phone" size="mini" :disabled="setInt">获取验证码<span v-show="setInt">({{count}}s)</span></el-button>
			</div>
			<el-button @click="login" round class="btn-login">登陆</el-button>
			<!--<el-button @click="getCookie" round class="btn-login">获取cookie</el-button>-->
			<!--<el-button round class="btn-register" @click="goRegister">注册</el-button>-->
		</el-form>
		<div class="bg-bottom">

		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import $ from 'jquery'
	import axios from '../ajax'
	import URL from '../urlConfig'
	import $http from 'axios'
	import * as Cookies from 'tiny-cookie'
	import Qs from 'qs';
	const TIME_COUNT = 60;
	export default {
		name: 'login',
		data() {
			return {
				loginForm: {
					phone: '',
					//					password: '',
					verCode: null,
				},
				setInt: false,
				count: '',
				timer: null,
				wechatId: '',
				openId: '',
				jumpThree: false, //判断页面跳转几次
			}
		},
		computed: {
			...mapState(['phone'])
		},
		async mounted() {
			this.openId = this.getCookies('wechatId');
			if(!this.openId) {
				this.jumpThree = true;
				await this.getOpenId();
			}
		},
		methods: {
			getCookie() {
				this.userPhone = this.getCookies('userPhone');

			},
			//获取用户openId

			async getOpenId() {
				this.url = (await $http.post(URL.userSweet)).data.url;
				window.location.href = this.url;

			},

			//微信重定向接口
			getUser() {
				$http.get(URL.dongtai, {

					})
					.then(res => {
						if(res.data.code == 200) {
							this.wechatId = res.data.wechatId;

						} else {
							this.$router.push({
								name: 'login'
							})
						}
					})
					.catch(err => {
						console.log(err);
					})
			},

			//接收验证码
			getVerCode() {

				if(!this.timer) {

					this.count = TIME_COUNT;
					this.setInt = true;
					this.timer = setInterval(() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.setInt = false;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}

				axios.post(URL.sendMessage, {
						mobile: this.loginForm.phone
					})
					.then(res => {
						if(res.data.code == 200) {
							this.$message('验证码发送成功');
						}

					})
					.catch(err => {
						console.log(err);
					})
			},
			goRegister() {
				this.$router.push({
					name: 'register'
				})
			},
			forgetPassword() {
				this.$router.push({
					name: 'forgetPassword'
				})
			},
			login() {

				$http.post(URL.login, Qs.stringify({
						phone: this.loginForm.phone,
						messageCode: this.loginForm.verCode,
						wechatId: this.openId

					}), {
						transformResponse: [function(data) {
							//在这里根据自己的需求改变数据

							if(!data) return;
							var temData = JSON.parse(data);
							return temData;
							//							if(temData.code !== 200) {
							//
							//								this.$layer.msg('密码或验证码有误!');
							//
							//							}
						}]
					})
					.then(res => {
						if(res.data.code == 200) {

							this.getCookie();

							//							Cookies.set("ADMINTOKEN", this.userPhone);
							localStorage.setItem('phone', this.userPhone);
							this.$store.dispatch('getPhoneA', this.userPhone);
							//							if(this.jumpThree){
							//								this.$router.go(-5);
							//							}else{
							//								this.$router.go(-1);
							//							}
							
							if(!localStorage.getItem('url')){
								this.$router.push({
									name:'index',
								})
							}

							window.location.href = localStorage.getItem('url');

							//							this.$router.push({
							//								path: '/',
							//								query: {
							//									phone: this.userPhone
							//								}
							//							});
						} else {
							this.$message(res.data.flag);
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			getCookies: function(name) {

				var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if(arr = document.cookie.match(reg))
					return(arr[2]);
				else
					return null;
			}

		}
	}
</script>

<style lang='scss'>
	.vl-notify {
		z-index: 99999;
	}
	
	#login {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		background: #da1711;
		position: relative;
		.bg-top {
			position: absolute;
			top: 0;
			height: 45%;
			width: 100%;
			background: url(../assets/login-top.png) no-repeat;
			background-size: 100% 100%;
		}
		.bg-bottom {
			position: absolute;
			bottom: 0;
			height: 21%;
			width: 100%;
			background: url(../assets/login-bottom.png) no-repeat;
			background-size: 100% 100%;
		}
		.main {
			position: absolute;
			top: 18%;
			z-index: 9999;
			padding: 0 14%;
			.verCodeWrapper {
				overflow: hidden;
				.verCode {
					width: 53%;
				}
				.btn-phone {
					float: right;
					margin-top: 10px;
				}
			}
			.el-input__inner {
				background: rgba(255, 255, 255, 0);
				border: none;
				border-bottom: 1px solid #fff;
				border-radius: 0;
				color: #fff;
			}
			.el-input__inner::-webkit-input-placeholder {
				color: #fff;
			}
			.forgetPassword {
				width: 100%;
				text-align: right;
				color: #fff;
				line-height: 28px;
				text-decoration: underline;
			}
			.input-top {
				margin-top: 30%;
			}
			.input-bottom {
				margin-top: 4%;
			}
			.btn-login {
				color: red;
				background: #fff;
				border: #fff;
				width: 100%;
				margin-top: 12%;
				border: 2px solid #fff;
			}
			.btn-register {
				background: #da1711;
				border: 2px solid #fff;
				color: #fff;
				width: 100%;
				margin-top: 4%;
			}
			.el-button+.el-button {
				margin-left: 0px;
			}
		}
	}
</style>