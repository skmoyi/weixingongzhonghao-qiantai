<template>
	<div id="register">
		<div class="bg-top">

		</div>
		<el-form :model="infoForm" class="main">

			<el-input v-model="infoForm.userName" placeholder="请输入姓名"></el-input>

			<el-input @blur="idBlur(infoForm.userId)" maxlength="18" v-model="infoForm.userId" placeholder="请输入身份证号信息"></el-input>

			<el-form-item>
				<el-input v-model="infoForm.phone" maxlength="11" class="input-phone" placeholder="输入手机号"></el-input>
				<el-button @click="getVerCode" class="btn-phone" size="mini" :disabled="setInt">获取验证码<span v-show="setInt">({{count}}s)</span></el-button>
			</el-form-item>
			<el-input v-model="infoForm.verificationCode" placeholder="输入验证码"></el-input>
			<el-button @click="registers" class="submit" round>提交审核</el-button>
		</el-form>
		<div class="bg-bottom">

		</div>
	</div>
</template>

<script>
	import axios from '../ajax'
	import URL from '../urlConfig'
	import $http from 'axios'
	import QS from 'qs'
	const TIME_COUNT = 60;
	export default {
		name: 'login',

		data() {
			return {
				infoForm: {
					userName: '',
					userId: '',
					phone: '',
					verificationCode: '',
				},
				setInt: false,
				count: '',
				timer: null
			}
		},
		methods: {

			//验证数据库有无用户身份证号码
			idBlur(val) {
				let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;

				if(!reg.test(val)) {
					this.$layer.msg('请输入正确的身份证号码');
					return false;
				}

				var ths = this;
				$http.post(URL.idVerify, QS.stringify({
						idNumber: val
					}))
					.then(res => {
						if(res.data.code == 200) {
							if(res.data.flag) {
								ths.$layer.msg('该用户已注册');

							} else {
								ths.$layer.msg('验证通过');
							}
						} else {
							ths.$layer.msg('请求出错');
						}
					})
					.catch(err => {
						ths.$layer.msg('请求超时，请稍后重试')
					})
			},
			//接收验证码
			getVerCode() {
				
				if(!this.infoForm.phone){
					this.$layer.msg('请输入手机号码');
					return;
				}

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
						mobile: this.infoForm.phone
					})
					.then(res => {
						if(res.data.code == 200) {
							this.$layer.msg('验证码发送成功');
						}

					})
					.catch(err => {
						this.$layer.msg('发送失败，请稍后重试');
					})
			},
			//注册用户
			registers() {

				axios.post(URL.register, {
						name: this.infoForm.userName,
						idNumber: this.infoForm.userId,
						phone: this.infoForm.phone,
						messageCode: this.infoForm.verificationCode
					})
					.then(res => {
						if(res.data.code == 200) {
							this.$layer.msg('注册成功');
							this.$router.push('/login');
						}
					})
					.catch(err => {
						this.$layer.msg('请求超时，请稍后重试');
					})
			}
		}
	}
</script>

<style lang='scss'>
	#register {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		background: red;
		position: relative;
		.bg-top {
			position: absolute;
			top: 0;
			height: 100%;
			width: 100%;
			background: url(../assets/login-top01.png) no-repeat;
			/*background-size: 100% 100%;*/
		}
		/*.bg-bottom {
			position: absolute;
			bottom: 0;
			height: 50%;
			width: 100%;
			background: url(../assets/login-bottom.png) no-repeat;
			background-size: 100% 100%;
		}*/
		.main {
			position: absolute;
			top: 34%;
			left: 5%;
			width: 80%;
			background: #fff;
			border-radius: 5px;
			z-index: 9999;
			padding: 0 5%;
			.el-input__inner {
				background: rgba(255, 255, 255, 0);
				border: none;
				border-bottom: 1px solid gray;
				border-radius: 0;
				height: 50px;
				line-height: 50px;
			}
			.input-top {
				margin-top: 30%;
			}
			.input-bottom {
				margin-top: 4%;
			}
			.el-form-item {
				margin-bottom: 0;
				.input-phone {
					width: 60%
				}
				.btn-phone {
					float: right;
					margin-top: 13px;
				}
			}
			.btn-login {
				color: red;
				background: #fff;
				border: #fff;
				width: 100%;
				margin-top: 5%;
				border: 2px solid #fff;
			}
			.btn-register {
				background: red;
				border: 2px solid #fff;
				color: #fff;
				width: 100%;
				margin-top: 4%;
			}
			.el-button+.el-button {
				margin-left: 0px;
			}
			.submit {
				width: 100%;
				margin: 8% 0;
			}
		}
	}
</style>