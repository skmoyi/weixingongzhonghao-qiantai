<template>
	<div id="organization">
		<div class="userInfo">
			<div class="imgWrapper"><img class="img" src="../../assets/touxiang.png" alt="" /></div>
			<div class="userName">{{userInfo.name}}</div>
		</div>
		<div class="table-title">填写党组织关系转换申请信息</div>
		<el-form v-model="baseForm" class="main">
			<el-form-item label="党委名称：">
				<el-input :disabled="submitable" v-model="baseForm.organizationName" class="left" placeholder="请点击填写"></el-input>
			</el-form-item>
			<el-form-item label="基层支部名称：">
				<el-input :disabled="submitable" v-model="baseForm.secondaryName" class="left" placeholder="请点击填写"></el-input>
			</el-form-item>
			<div class="clear">
				<el-form-item class="left" label="姓名:">
					<el-input :disabled="submitable" v-model="baseForm.userName" id="nameLeft" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item class="right" label="性別：">
					<el-select :disabled="submitable" v-model="baseForm.userSex">
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<el-form-item label="年龄：">
				<el-input :disabled="submitable" v-model="baseForm.userAge" placeholder="请点击填写"></el-input>
			</el-form-item>
			<el-form-item label="民族：">
				<el-select :disabled="submitable" v-model='baseForm.userNation' placeholder="点击请选择" class="national">
					<el-option v-for="(item,index) in nations" :key="item.dicId" :label="item.dicName" :value="item.dicId"></el-option>

				</el-select>
			</el-form-item>
			<el-form-item label="是否为正式党员：">
				<el-select :disabled="submitable" v-model="baseForm.userCategory">
					<el-option label="是" value="是"></el-option>
					<el-option label="否" value="否"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="身份证号：">
				<el-input :disabled="submitable" v-model="baseForm.userIdNumber" placeholder="请输入身份证号码"></el-input>
			</el-form-item>
			<el-form-item label="联系电话：">
				<el-input :disabled="submitable" v-model="baseForm.userPhone" placeholder="点击填写"></el-input>
			</el-form-item>
		</el-form>

		<el-button @click="submit" class="submit" round >提交申请</el-button>

	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import axios from '../../ajax'
	import $http from 'axios'
	import URL from '../../urlConfig'
	import * as Cookies from 'tiny-cookie'
	export default {
		name: 'organization',
		data() {
			return {
				baseForm: {
					organizationName: '',
					userName: '',
					userAge: '',
					userSex: '',
					userNation: '',
					userCategory: '',
					userIdNumber: '',
					userPhone: '',

				},
				nations: [],
				submitable: false, //根据审核是否通过判断是否可以提交信息
			}
		},
		mounted() {

			setTimeout(() => {
				if(this.auditState) {
					this.$router.push({
						name: 'partymember'
					})
				}
				this.baseForm.userName = this.userInfo.name || '';
				this.baseForm.userIdNumber = this.userInfo.idNumber || '';
				this.relation();
				this.getNation();
			}, 100)
		},
		computed: {
			...mapState(['userInfo', 'auditState'])
		},
		methods: {

			/*
			 * params:index,row
			 *
			 * return: 无
			 * function:删除事件
			 * */
			relation() {

				axios.post(URL.getSingleOrganization, {
						id: this.userInfo.id,
					}).then(res => {

						if(res.data.code == 200) {
							this.baseForm = res.data.flag;
							if(!parseInt(this.baseForm.whetherSucceed) == 1) {

								this.submitable = false;
							} else {

								this.submitable = true;
							}
						}
					})
					.catch(err => {
						console.log(err);
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
			},
			//提交审核
			submit() {
				if(this.submitable){
					this.$message('审核通过')
					return;
				}
				
				
				this.baseForm.id = this.userInfo.id;

				let TOKEN = Cookies.get('ADMINTOKEN') || '';
				$http.post(URL.updOrganization, this.baseForm, {
						dataType: "JSON",
						headers: {
							"Content-Type": "application/json;charsetset=UTF-8",
							"Authorization": TOKEN
						}
					})
					.then(res => {
						if(res.data.code == 200) {
							this.$message('提交成功')

						}
					})
					.catch(err => {
						this.$layer.msg('请求超时，请稍后重试');
					})
			}
		},
	}
</script>

<style lang="scss">
	#organization {
		width: 100%;
		min-height: 100vh;
		background: #f1f1f1;
		text-align: center;
		.el-input__suffix {
			right: -7px;
		}
		.el-input__inner {
			background: #fff;
		}
		.el-input--suffix .el-input__inner {
			padding-right: 18px;
		}
		.userInfo {
			background: url(../../assets/index/bg-index.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			justify-content: cenetr;
			align-items: center;
			.imgWrapper {
				margin-top: 6%;
				text-align: center;
				.img {
					width: 60%;
				}
			}
			.userName {
				color: #fff;
				margin: 6% 0;
			}
		}
		.table-title {
			text-align: center;
			padding: 3% 0;
			font-size: 14px;
			color: #8b8b8b;
		}
		.main {
			background: #fff;
			margin: 0 4%;
			padding: 0 4%;
			.left {
				width: 50%;
				.el-form-item__content {
					width: 50%;
					text-align: right;
				}
				.el-form-item__label {
					padding: 0;
				}
				#nameLeft {
					text-align: left;
					padding: 0;
				}
			}
			.right {
				width: 50%;
				.el-select {
					width: 60%;
					.el-input {
						width: 100%;
					}
				}
			}
			.el-form-item {
				border-bottom: 1px solid #f1f1f1;
				margin-bottom: 0;
				&:last-child {
					border: none;
				}
				.el-select {
					width: 100%;
					.el-input {
						width: 100%;
					}
				}
				.el-form-item__label {
					line-height: 50px;
				}
				.el-input {
					width: 70%;
					line-height: 50px;
					float: right;
					.el-input__inner {
						border: none;
						text-align: right;
					}
				}
			}
		}
		.submit {
			background: #e53a1e;
			width: 92%;
			margin: 7% auto;
			color: #fff;
		}
		.el-form-item__content {
			line-height: 7px;
			text-align: right;
			overflow: hidden;
		}
	}
</style>