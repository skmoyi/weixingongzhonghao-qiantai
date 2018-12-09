<template>
	<div id="resetPassword">
		<el-form :model="infoForm" :rules="rulesName" class="main" status-icon>
			<el-form-item label="输原密码：">
				<el-input v-model="infoForm.oldPassword"></el-input>
				<el-button @click="verPass" :disabled="setInt">验证<span v-show="setInt">({{count}}s)</span></el-button>
			</el-form-item>
			<!--<el-form-item label="验证码：">
				<el-input></el-input>
				<span>请输入验证码</span>
			</el-form-item>-->
			<el-form-item label="输入新密码：" prop="password">
				<el-input v-model="infoForm.password" class="right" placeholder="点击填写"></el-input>
			</el-form-item>
			<el-form-item label="确认密码：" prop="checkPass">
				<el-input v-model="infoForm.checkPass" class="right" placeholder="点击填写"></el-input>
			</el-form-item>
		</el-form>
		<el-button :disabled="verPassword" @click="pass" class="success" round>完成</el-button>
	</div>
</template>

<script>
	import URL from '../urlConfig'
	import axios from '../ajax'
	import { mapState, mapMutations } from 'vuex'
	const TIME_COUNT = 60;
	export default {
		name: 'resetPassword',
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
					oldPassword: '',
					password: '',
					checkPass: '',
				},
				setInt: false,
				count: '',
				timer: null,
				verPassword: true, //验证密码正确
				rulesName: {
					phone: [{
						required: true,
						message: '请输入电话号码',
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
		computed: {
			...mapState(['id'])
		},
		mounted() {

		},
		methods: {
			//修改新密码
			pass() {
				alert(111);
				axios.post(URL.changePass, {
						id: this.id,
						password: this.infoForm.password
					})
					.then(res => {
						if(res.data.code == 200) {
							this.$layer.msg('修改密码成功');
							this.$router.push({
								name: 'partymember'
							});
						}
					})
					.catch(err => {
						this.$layer.msg('请求超时，请稍后重试');
					})
			},
			//验证密码
			verPass() {
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
				axios.post(URL.verpass, {
						id: this.id,
						password: this.infoForm.oldPassword
					})
					.then(res => {
						if(res.data.code == 200) {
							this.verPassword = false;
							this.$layer.msg('通过验证');
						}
					})
					.catch(err => {
						this.$layer.msg("请求超时，请稍后重试");
					})
			},
			//接收验证码
			sendMessage() {

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
		}

	}
</script>

<style lang="scss">
	#resetPassword {
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
					width: 40%;
					.el-input__inner {
						border: none;
						text-align: right;
					}
				}
				.el-button {
					border: none;
					border-left: 1px solid #f1f1f1;
					border-radius: 0;
					padding: 5px 20px 5px 20px;
					float: right;
					margin-top: 10px;
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