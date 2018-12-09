<template>
	<div id="forgetPassword">
		<el-form :model="infoForm" ref="infoForm" :rules="rulesName" class="main" status-icon>
			<el-form-item label="输入手机号：" prop="phone">
				<el-input v-model="infoForm.phone"></el-input>
				<el-button :disabled="setInt" @click="sendMessage">发送<span v-show="setInt">({{count}}s)</span></el-button>
			</el-form-item>
			<el-form-item label="验证码：" prop="verificationCode">
				<el-input v-model="infoForm.verificationCode"></el-input>
				<span>请输入验证码</span>
			</el-form-item>
			<el-form-item label="输入新密码：" prop="password">
				<el-input type="password" v-model="infoForm.password" placeholder="点击填写"></el-input>
			</el-form-item>
			<el-form-item label="确认密码：" prop="checkPass">
				<el-input type="password" v-model="infoForm.checkPass" placeholder="点击填写"></el-input>
			</el-form-item>
		</el-form>
		<el-button @click="submit" class="success" round>完成</el-button>
	</div>
</template>

<script>
	import axios from '../ajax'
	import URL from '../urlConfig'
	import $http from 'axios'
	import QS from 'qs'
	const TIME_COUNT = 60;
	export default {
		name: 'forgetPassword',
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.infoForm.checkPass !== '') {
						this.$refs.infoForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.infoForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				infoForm: {
					phone: '',
					verificationCode: '',
					password: '',
					checkPass: '',
				},
				setInt: false,
				count: '',
				timer: null,
				rulesName: {
					phone: [{
						required: true,
						message: '请输入电话号码',
						trigger: 'blur'
					}],
					verificationCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			//接收验证码
			sendMessage() {
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

				$http.post(URL.sendMessage, QS.stringify({
						mobile: this.infoForm.phone
					}))
					.then(res => {
						if(res.data.code == 200) {
							this.$layer.msg('验证码发送成功');
						}

					})
					.catch(err => {
						this.$layer.msg('发送失败，请稍后重试');
					})

			},
			//提交新密码
			submit() {

				$http.post(URL.forgetPass, QS.stringify({
						phone: this.infoForm.phone,
						password: this.infoForm.password,
						messageCode: this.infoForm.verificationCode
					}))
					.then(res => {
						if(res.data.code == 200) {
							this.$layer.msg('登陆密码修改成功');
						}

					})
					.catch(err => {
						this.$layer.msg('发送失败，请稍后重试');
					})
			}
		}
	}
</script>

<style lang="scss">
	#forgetPassword {
		box-sizing: border-box;
		padding: 4%;
		background: #f1f1f1;
		height: 100%;
		width: 100%;
		.main {
			width: 100%;
			background: #fff;
			padding: 0 4%;
			box-sizing: border-box;
			.el-form-item:last-child {
				border: none;
			}
			.el-form-item {
				height: 50px;
				border-bottom: 1px solid #f1f1f1;
				margin-bottom: 0;
				.el-form-item__label {
					line-height: 50px;
				}
				.el-form-item__content {
					line-height: 50px;
				}
				.el-input {
					width: 37%;
					.el-input__inner {
						border: none;
					}
				}
				.el-button {
					border: none;
					border-left: 1px solid #f1f1f1;
					border-radius: 0;
					padding: 5px 0px 5px 20px;
				}
			}
		}
		.success {
			width: 100%;
			background: #e53a1e;
			color: #fff;
			margin-top: 5%;
		}
	}
</style>