<template>
	<div id="partymember">

		<el-form v-model="infoForm" class="main position01" :rules="infoRules" ref="infoForm">
			<h2 class="title">基本信息表</h2>

			<div class="row">
				<el-form-item label="姓名：" class="left" prop="name">
					<el-input :disabled="tonguo" v-model="infoForm.name" class="name-input" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item class="right" label="性别：" prop="sex">
					<el-select v-model="infoForm.sex" class="gender" :disabled="tonguo">
						<el-option v-for="(item,index) in sexs" :key="index" :label="item.name" :value="item.value"></el-option>

					</el-select>
				</el-form-item>
			</div>
			<div class="row">
				<el-form-item label="民族：" prop="nation">
					<el-select :disabled="tonguo" v-model='infoForm.nation' placeholder="点击请选择" class="national">
						<el-option v-for="(item,index) in nations" :key="item.dicId" :label="item.dicName" :value="item.dicId"></el-option>

					</el-select>
				</el-form-item>
			</div>
			<div class="row">
				<el-form-item label="公民身份证号:" prop="idNumber">
					<el-input :disabled="tonguo" v-model="infoForm.idNumber" class="cardId" placeholder="请输入身份证号码"></el-input>
				</el-form-item>
			</div>
			<div class="row">
				<el-form-item label="出生日期:" prop="birthDay">
					<!--<el-date-picker :disabled="tonguo" v-model="infoForm.birthDay" type="date" placeholder="选择日期" class="datePicker" value-format="yyyy-MM-dd">
					</el-date-picker>-->
					 <datetime :disabled="tonguo" v-model="infoForm.birthDay" min-year='1900'></datetime>
					
				</el-form-item>
			</div>
			<div class="row">
				<el-form-item label="学历：" prop="education">
					<el-select :disabled="tonguo" v-model="infoForm.education" placeholder="点击请选择" class="national">
						<el-option v-for="(item,index) in educations" :key="item.dicId" :label="item.dicName" :value="item.dicId"></el-option>

					</el-select>
				</el-form-item>
			</div>

		</el-form>
		<el-form class="main position02" :rules="infoRules2" ref="infoForm">
			<div class="row">
				<el-form-item label="人员类别：" prop="category">
					<el-select :disabled="tonguo" v-model="infoForm.category" placeholder="点击请选择" class="national">
						<el-option label="正式党员" value="正式党员"></el-option>
						<el-option label="预备党员" value="预备党员"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="row">
				<el-form-item label="工作岗位：" prop="workJobs">
					<el-select :disabled="tonguo" v-model="infoForm.workJobs" placeholder="点击请选择" class="national">
						<el-option v-for="(item,index) in works" :key="index" :label="item.dicName" :value="item.dicId"></el-option>

					</el-select>
				</el-form-item>
			</div>
		</el-form>
		<el-form class="main position03" :rules="infoRules3" ref="infoForm">
			<div class="row">

				<el-form-item label="联系电话：" prop="phone">
					<el-input :disabled="tonguo" v-model="infoForm.phone" class="cardId" placeholder="请点击填写"></el-input>
				</el-form-item>

			</div>
			<div class="row">
				<el-form-item label="固定电话：" prop="fixedPhone">
					<el-input :disabled="tonguo" v-model="fixedPhone01" class="fixedPhone" placeholder="请点击填写"></el-input>+
					<el-input :disabled="tonguo" v-model="fixedPhone02" class="fixedPhone" placeholder="请点击填写"></el-input>
				</el-form-item>
			</div>
			<div class="row">

				<el-form-item label="家庭住址（具体到门牌号）:" prop="addressData">
					<!--<v-distpicker type="mobile"></v-distpicker>-->
					<!--<area-select v-model="selected"></area-select>
					<area-cascader v-model="selected2"></area-cascader>-->
					<group>
						<x-address :disabled="tonguo" @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" :show.sync="showAddress"></x-address>
						<!--<cell title="上面value值" :value="value"></cell>-->
					</group>
					<el-input :disabled="tonguo" v-model="infoForm.address" placeholder="点击填写详细地址"></el-input>
				</el-form-item>

			</div>
		</el-form>
		<el-form class="main position04" :rules="infoRules4" ref="infoForm">
			<div class="row">
				<el-form-item label="党籍状态：" prop="partyState">
					<el-select :disabled="tonguo" v-model="infoForm.partyState" placeholder="点击请选择" class="national">
						<el-option label="正常" value="正常"></el-option>
						<el-option label="停止党籍" value="停止党籍"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="row">
				<el-form-item label="是否为失联党员：" prop="lostIn">
					<el-select :disabled="tonguo" v-model="infoForm.lostIn" placeholder="点击请选择" class="cnational">
						<el-option label="是" value="是"></el-option>
						<el-option label="否" value="否"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="row" v-if="infoForm.lostIn=='是'">
				<el-form-item label="失去联系日期:" prop="lostTime">
					<!--<el-date-picker :disabled="tonguo" v-model="infoForm.lostTime" type="date" placeholder="选择日期" class="datePicker" value-format="yyyy-MM-dd">
					</el-date-picker>-->
					<datetime min-year='1900' :disabled="tonguo" v-model="infoForm.lostTime"></datetime>
				</el-form-item>
			</div>
			<div class="row">
				<el-form-item label="是否为流动党员：" prop="theFlow">
					<el-select :disabled="tonguo" v-model="infoForm.theFlow" placeholder="点击请选择" class="cnational">
						<el-option label="是" value="是"></el-option>
						<el-option label="否" value="否"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="row">
				<el-form-item label="工作单位名称:" prop="workUnit">
					<el-input :disabled="tonguo" v-model="infoForm.workUnit" class="cardId" placeholder="请点击填写"></el-input>
				</el-form-item>
			</div>
		</el-form>

		<el-button v-if="!tonguo" @click="submit" class="submit" round>提交审核</el-button>

		<div v-transfer-dom>
			<alert v-model="show2" :title="('恭喜')" :content="('党员信息提交完成')"></alert>
		</div>
		<!--<div @click="resetPassword" class="password">修改登陆密码</div>
		<div @click="logout" class="password">退出登陆</div>-->

	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import {Datetime, Group, Alert, XAddress, ChinaAddressV4Data, XButton, Cell, Value2nameFilter as value2name, TransferDomDirective as TransferDom } from 'vux'
	import axios from '../../ajax'
	import $http from 'axios'
	import URL from '../../urlConfig'
	import qs from 'QS'
	import * as Cookies from 'tiny-cookie'
	export default {
		name: 'partymember',
		directives: {
			TransferDom
		},
		components: {
			XAddress,
			Group,
			Cell,
			Alert,
			Datetime,
		},
		data() {
			return {
				infoForm: {
					name: '',
					sex: '',
					nation: '',
					idNumber: '',
					birthDay: '',
					education: '',
					category: '',
					workJobs: '',
					phone: '',
					fixedPhone: '',
					address: '',
					province: '',
					city: '',
					county: '',
					partyState: '',
					lostIn: '',
					lostTime: '',
					theFlow: '',
					workUnit: '',
				},
				sexs: [{
					name: '男',
					value: '男'
				}, {
					name: '女',
					value: '女'
				}],
				nations: [],
				educations: [],
				works: [],
				fixedPhone01: '',
				fixedPhone02: '',

				title: '',
				value_0_1: [],
				value: ["360000", "360100", "360102"], //省市区
				name: [],
				addressIds: [],
				title2: '设置值',
				value2: ['天津市', '市辖区', '和平区'],
				value3: ['广东省', '中山市', '--'],
				addressData: ChinaAddressV4Data,
				value4: [],
				value5: ['广东省', '深圳 市', '南山区'],
				showAddress: false,
				tonguo: false, //审核通过
				show2: false, //党员信息提交提示窗口
				infoRules: {
					name: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					nation: [{
						required: true,
						message: '请选择民族',
						trigger: 'change'
					}],
					idNumber: [{
						required: true,
						message: '请填写公民身份证号',
						trigger: 'blur'
					}],
					birthDay: [{
						type: 'date',
						required: true,
						message: '请选择出生日期',
						trigger: 'change'
					}],
					education: [{
						required: true,
						message: '请选择学历',
						trigger: 'change'
					}],
				},
				infoRules2: {
					category: [{
						required: true,
						message: '请选择人员类别',
						trigger: 'change'
					}],
					workJobs: [{
						required: true,
						message: '请选择工作岗位',
						trigger: 'change'
					}],
				},
				infoRules3: {
					phone: [{
						required: true,
						message: '请填写联系电话',
						trigger: 'blur'
					}],
					fixedPhone: [{
						required: true,
						message: '请填写固定电话',
						trigger: 'blur'
					}],
					addressData: [{
						required: true,
						message: '请填写详细地址',
						trigger: 'blur'
					}],
				},
				infoRules4: {
					partyState: [{
						required: true,
						message: '请选择党籍状态',
						trigger: 'change'
					}],
					lostIn: [{
						required: true,
						message: '请选择是否为失联党员',
						trigger: 'change'
					}],
					lostTime: [{
						type: 'date',
						required: true,
						message: '请选择失去联系日期',
						trigger: 'change'
					}],
					theFlow: [{
						required: true,
						message: '请选择是否为流动党员',
						trigger: 'change'
					}],
					workUnit: [{
						required: true,
						message: '请填写工作单位名称',
						trigger: 'blur'
					}],
				},
			}
		},
		computed: {
			...mapState(['userInfo', 'phone']),
		},
		mounted() {

			var ths = this;
			setTimeout(function() {
				var phone = ths.userInfo.phone;
				$http.post(URL.partyMember, qs.stringify({
						phone: phone,
					})).then(res => {

						if(res.data.code == 200) {
							ths.infoForm = res.data.flag || {};
							ths.fixedPhone01 = res.data.flag.fixedPhone.split("-")[0];
							ths.fixedPhone02 = res.data.flag.fixedPhone.split("-")[1];

							var newAddress = [];
							newAddress.push(res.data.flag.province)
							newAddress.push(res.data.flag.city)
							newAddress.push(res.data.flag.county)
							ths.value = newAddress;

						}
					})
					.catch(err => {
						console.log(err);
					})
				if(parseInt(ths.userInfo.auditState) == 1) {
					ths.tonguo = true;
				}

				ths.getNation();
				ths.getEducation();
				ths.getWork();

			}, 1000)

		},

		methods: {

			/*
			 * params:val
			 * return: 无
			 * function: 添加的事件
			 * 
			 * */
			async logout() {
				let data = (await axios.post(URL.logout, {
					id: this.userInfo.id
				})).data;
				if(data.code == 200) {
					sessionStorage.setItem('phone', '');
					this.$router.push({
						name: 'login'
					})
				}
			},

			//...mapMutations(['getUserInfo']),

			doShowAddress() {
				this.showAddress = true
				setTimeout(() => {
					this.showAddress = false
				}, 2000)
			},
			onShadowChange(ids, names) {
				this.name = names;
				this.addressIds = ids;
				// console.log(1111)
				// console.log(ids)
				// console.log(names)
			},
			changeData() {
				this.value2 = ['430000', '430400', '430407']
			},
			changeDataByLabels() {
				this.value2 = ['广东省', '广州市', '天河区']
			},
			changeDataByLabels2() {
				this.value2 = ['广东省', '中山市', '--']
			},
			getName(value) {
				return value2name(value, ChinaAddressV4Data)

			},
			logHide(str) {
				console.log('on-hide', str)
			},
			logShow(str) {
				console.log('on-show')
			},

			//提交审核
			submit() {
				if(this.tonguo) {
					this.$message('已经审核');
					return;
				}

				this.$layer.msg('正在提交党员信息');
				// console.log(this.infoForm)
				// console.log(this.fixedPhone01)
				if(this.infoForm.name == '') {
					this.$layer.msg('请填写姓名');
					return
				}
				if(this.infoForm.sex == '') {
					this.$layer.msg('请选择性别');
					return
				}
				if(this.infoForm.nation == '') {
					this.$layer.msg('请选择民族');
					return
				}
				if(this.infoForm.idNumber == '') {
					this.$layer.msg('请填写公民身份证号');
					return
				}
				if(this.infoForm.birthDay == '') {
					this.$layer.msg('请选择出生日期');
					return
				}
				if(this.infoForm.education == '') {
					this.$layer.msg('请选择学历');
					return
				}
				if(this.infoForm.category == '') {
					this.$layer.msg('请选择人员类别');
					return
				}

				if(this.infoForm.workJobs == '') {
					this.$layer.msg('请选择工作岗位');
					return
				}

				if(this.infoForm.phone == '') {
					this.$layer.msg('请填写联系电话');
					return
				}
				this.infoForm.fixedPhone = this.fixedPhone01 + '-' + this.fixedPhone02;
//				if(this.infoForm.fixedPhone == '-') {
//					this.$layer.msg('请填写固定电话');
//					return
//				}
				// if(this.infoForm.name == ''){
				// 	this.$layer.msg('请选择家庭住址');
				// 	return
				// }
				// console.log(this.name)
				// return
				this.infoForm.id = this.userInfo.id;
				this.infoForm.province = this.addressIds[0];
				this.infoForm.city = this.addressIds[1];
				this.infoForm.county = this.addressIds[2];
				// console.log(this.value)
				// console.log(this.infoForm.province)
				if(this.infoForm.province == '' || null) {
					this.$layer.msg('请填写家庭住址');
					return
				}
				if(this.infoForm.partyState == '') {
					this.$layer.msg('请选择党籍状态');
					return
				}
				if(this.infoForm.lostIn == '') {
					this.$layer.msg('请选择是否为失联党员');
					return
				}
				if(this.infoForm.lostTime == '') {
					this.$layer.msg('请选择失去联系日期');
					return
				}
				if(this.infoForm.theFlow == '') {
					this.$layer.msg('请选择是否为流动党员');
					return
				}
				if(this.infoForm.workUnit == '') {
					this.$layer.msg('请填写工作单位名称');
					return
				}

				// this.$refs['infoForm'].validate((valid) => {
				// 	console.log(11111)
				// 	if(valid) {
				// 		alert(111)
				// 	}else{
				// 		alert(111)
				// 		this.$layer.msg('请填写完整信息');
				// 		return false;
				// 	}
				// })

				let TOKEN = Cookies.get('ADMINTOKEN') || '';
				$http.post(URL.addDetail, this.infoForm, {
						dataType: "JSON",
						headers: {
							"Content-Type": "application/json;charsetset=UTF-8",
							"Authorization": TOKEN
						}
					})
					.then(res => {
						if(res.data.code == 200) {
							this.show2 = true;
							//填写完成页面跳转
							// this.$router.push({
							// 	name: 'complete'
							// })
							// this.$alert('这是一段内容', '标题名称', {
							// confirmButtonText: '确定',
							// callback: action => {
							// 	this.$message({
							// 	type: 'info',
							// 	message: `action: ${ action }`
							// 	});
							// }
							// });
						}else{
							this.$message(res.data.msg);
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			//获得工作岗位
			getWork() {
				axios.post(URL.getWork)
					.then(res => {
						if(res.data.code == 200) {
							this.works = res.data.list
							this.works.forEach((item, index) => {
								item.dicName = item.dicName.slice(0, 11);
							})
						} else {
							this.$layer.msg(res.data.msg);
						}
					})
					.catch(err => {
						this.$layer.msg('请求失败，请稍后重试');
					})
			},
			//获得学历信息
			getEducation() {
				axios.post(URL.getEducation)
					.then(res => {
						if(res.data.code == 200) {

							this.educations = res.data.list
						} else {
							this.$layer.msg(res.data.msg);
						}
					})
					.catch(err => {
						this.$layer.msg('请求超时，请重试')
					})
			},
			resetPassword() {
				this.$router.push({
					name: 'resetPassword'
				})
			},
			//获得民族信息
			getNation() {
				axios.post(URL.getNation)
					.then(res => {
						if(res.data.code == 200) {
							this.nations = res.data.list
						}

					})
					.catch(err => {
						this.$layer.msg('请求超时，请重试');
					})
			}
		}
	}
</script>

<style lang='scss'>
	#partymember {
		box-sizing: border-box;
		width: 100%;
		min-height: 100vh;
		background: red;
		position: relative;
		background: url(../../assets/login-top01.png) no-repeat;
		background-size: 100% 100%;
		padding-bottom: 20px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		.el-input__suffix {
			right: -7px;
		}
		.weui-cells {
			width: 100%;
			font-size: 1.1rem;
			line-height: 40px;
			padding: 0;
			.weui-cell {
				padding: 0;
			}
		}
		.weui-cells:before {
			border-top: none;
		}
		/*.weui-cells:after {
			border: 1px solid #ccc;
		}*/
		.bg-top {
			position: absolute;
			top: 0;
			height: 50%;
			width: 100%;
		}
		.position01 {
			margin: 3% auto 0;
		}
		.position02 {
			margin: 3% auto 0;
		}
		.position03 {
			margin: 3% auto 0;
		}
		.position04 {
			margin: 3% auto 0;
		}
		.submit {
			width: 90%;
			margin: 3% auto 0;
		}
		.password {
			width: 90%;
			color: #fff;
			margin: 3% auto;
			text-align: center;
			text-decoration: underline;
		}
		.main {
			width: 80%;
			background: #fff;
			border-radius: 5px;
			padding: 0 5%;
			font-size: 1.3rem;
			overflow: hidden;
			.title {
				text-align: center;
				line-height: 50px;
			}
			.row {
				border-bottom: 1px solid #ccc;
				overflow: hidden;
			}
			.row:last-child {
				border-bottom: none;
			}
			.el-form-item__label {
				padding: 0;
			}
			.el-input__inner {
				background: rgba(255, 255, 255, 0);
				border: none;
				/*	border-bottom: 1px solid gray;*/
				border-radius: 0;
				height: 40px;
				line-height: 40px;
				padding: 0;
				text-align: right;
				padding-right: 14px;
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
					margin-top: 25px;
				}
				.name-input {
					width: 55%;
					.el-input__inner {
						text-align: left;
					}
				}
				.gender {
					width: 55%;
				}
				.cardId {
					width: 55%;
				}
				.national {
					width: 70%;
					float: right;
				}
				.cnational {
					box-sizing: border-box;
					width: 59%;
					.el-input__inner {
						padding-right: 14px;
					}
				}
				.datePicker {
					width: 40%;
				}
				.fixedPhone {
					width: 34%;
					float: none;
				}
			}
			.left {
				width: 50%;
			}
			.right {
				width: 50%;
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
			.el-input {
				float: right;
			}
			.el-form-item__content {
				line-height: 7px;
				text-align: right;
				.weui-cell{
					padding:16px 15px;
				}
			}
		}
	}
</style>