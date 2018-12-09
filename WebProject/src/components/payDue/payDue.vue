<template>
	<div id="payDue">
		<div class="userInfo">
			<div @click="payHistory" class="payHistory" v-show="num==1">缴费记录</div>
			<div class="imgWrapper"><img class="img" src="../../assets/touxiang.png" alt="" /></div>
			<div class="userName">{{userInfo.name}}</div>
		</div>
		<!--<img :src="testImage" alt="" />-->
		<!--<el-tabs>
			<el-tab-pane label="工资申报">工资申报</el-tab-pane>
			<el-tab-pane label="党员缴费">党员缴费</el-tab-pane>
		</el-tabs>-->
		<ul class="ulNav">
			<li class="navList" v-for="(item,index) in tabs" :class="{active:index==num}" @click="tab(index)">
				<div class="line"><span class="width-line">{{item}}</span></div>
			</li>

		</ul>
		<div class="tabCon">
			<div class="tabList" v-show="num==0">
				<el-input v-model="duesPay" placeholder="请填写工资收入"></el-input>
				<div class="pay" type='textarea' placeholder="上传凭证，如社保缴费信息等" :rows="13">

					<div v-if="imgArr.length==0" class="tip">上传凭证，如社保缴费信息等</div>
					<div class="imgWrapper" v-for="(imgs,index) in imgArr" :key="index">
						<i class="el-icon-circle-close-outline" @click="delImage(index)"></i>
						<img class="img" :src="imgs" alt="" />
					</div>
				</div>
				<!--<el-upload class="uploadSalary" :action="upImg" :on-change="handleChange" :headers="myHeaders" name="file" :limit="5" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="imgList" :on-success="success" :on-exceed="limitLayer" list-type="picture-card">
					<i class="el-icon-plus"></i>
				</el-upload>		
				<el-dialog :visible.sync="dialogVisible" append-to-body>
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>-->
				<div v-if="imgArr.length<5" class="uploadSalary" @click="uploadImages">
					<i class="el-icon-plus"></i>
				</div>

				<input type="file" ref="file" value="" id="file" @change="uploadConfig" accept="image/*" multiple="multiple" style="display:none">

				<div class="annotation">注：工资一旦填好后，一年后才可更改</div>
				<el-button @click="beforeSubmit" class="submit" round>提交审核</el-button>
			</div>
			<div class="tabList" v-show="num==1">
				<el-input v-model="months" placeholder="请输入缴费月数" class="pay-mounth"></el-input>
				<el-button class="getPay" @click="getPay" round :disabled="userInfo.whetherRechargeableOrNot=='false'">点击获取缴费信息</el-button>
				<div class="jisuan">
					每月工资收入（税后）在3000元以下（含3000元）者，交纳月工资收入的0.5%；3000 元以上至5000元（含5000元)者，交纳1%；5000元以上至10000元(含10000元)者，交 纳1.5%；10000元以上者，交纳2%
				</div>
				<div class="showPay" v-show="showPay">
					<h2 class="title">根据您工资申报薪资，本月需要缴纳的党费为：</h2>
					<div class="amount">￥：<span class="money">{{pay}}元</span></div>
					<el-button @click="goPay" class="goPay" round>前去支付</el-button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../ajax'
	import URL from '../../urlConfig'
	import { mapState, mapMutations } from 'vuex'
	import $http from 'axios'
	import * as Cookies from 'tiny-cookie'
	let TOKEN = Cookies.get('ADMINTOKEN') || '';
	import qs from 'qs'
	export default {
		name: 'payDue',
		data() {
			return {
				tabs: ['工资申报', '党员缴费'],
				tabContents: ['1', '2'],
				num: 0,
				showPay: false,
				duesPay: '',
				upImg: URL.uploadImage,
				imgList: [],
				dialogVisible: false,
				dialogImageUrl: '',
				myHeaders: {
					"Authorization": TOKEN
				},
				imgArr: [],
				testImage: '',
				files: [],
				imgSrc: [],
				pay: '', //应付金额
				months: 1, //月数
				auditState: '', //审核状态
				isClicked: false, //判断是否是第一次点击
			}
		},
		computed: {
			...mapState(['id', 'userInfo', 'auditState'])
		},
		watch: {
			imgArr: function() {

			}
		},
		mounted() {

			if(this.auditState) {
				this.$router.push({
					name: 'partymember'
				})
			}
			//			$http.post(URL.weChatPayH5);
			//			$http.get(URL.getSignKey);
		},
		methods: {
			/**
			 * 
			 * function 支付
			 */
			async goPay() {

				try {

					if(!this.isClicked) {
						this.isClicked = true;
						if(parseInt(this.auditState) !== 1) {
							this.$message('申请通过审核才能支付党费');
							return;
						}

						var json = (await this.$axios.get(URL.createOrder + '?wechatId=' + this.userInfo.wechatId + '&paymentAmount=' + this.pay)).data.flag;

						if(typeof WeixinJSBridge === 'undefined') {
							if(document.addEventListener) {
								document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(json), false)
							} else if(document.attachEvent) {
								document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(json))
								document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(json))
							}
						} else {
							this.onBridgeReady(json)
						}
					}

				} catch(err) {
					this.$message('用户验证失败请重新登陆');
					console.log(err);

				}

				//				this.$axios.post(
				//					'/api/fe/mobile/charge/payment', {
				//						'type': '1',
				//						'reservation': this.reservation,
				//						'dep': this.child.addresName,
				//						'depAddress': this.depAddress,
				//						'arr': this.child.backAddresname,
				//						'arrAddress': this.arrAddress,
				//						'passenger': this.busUserCode, // this.loginName,
				//						'slat': this.slat,
				//						'slng': this.slng,
				//						'elat': this.elat,
				//						'elng': this.elng,
				//						'time': this.child.selectDate,
				//						'uct': this.uct,
				//						'openId': __getItem('openId')
				//					}).then((response) => {
				//					console.log(response)
				//					let json = JSON.parse(response.data.data.payParm)
				//					console.log('22222' + json)
				//					if(response.data.code === 200) {
				//						if(typeof WeixinJSBridge === 'undefined') {
				//							if(document.addEventListener) {
				//								document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(json), false)
				//							} else if(document.attachEvent) {
				//								document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(json))
				//								document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(json))
				//							}
				//						} else {
				//							this.onBridgeReady(json)
				//						}
				//					} else if(response.data.code === 4009) {
				//						Toast('请设置用户名')
				//						this.$router.push({
				//							name: 'LoginName'
				//						})
				//					}
				//				}).catch(function(err) {
				//					console.log(err)
				//
				//				})
			},

			// 微信支付
			onBridgeReady(json) {

				let that = this
				window.WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						'appId': json.appId, // 公众号名称，由商户传入
						'timeStamp': json.timeStamp, // 时间戳，自1970年以来的秒数
						'nonceStr': json.nonceStr, // 随机串
						'package': json.packageValue,
						'signType': json.signType, // 微信签名方式：
						'paySign': json.paySign // 微信签名
					},
					function(res) {
						if(res.err_msg === 'get_brand_wcpay_request:ok') {
							that.isClicked = false;

							// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							$http.post(URL.addUserMoney, {
									userId: that.id,
									userMoney: that.pay,
									months: that.months,
									serialNumber: json.serialNumber,
									successFailure: '缴费成功',
									payMethod: '微信支付'
								}, {
									dataType: "JSON",
									headers: {
										"Content-Type": "application/json;charsetset=UTF-8",
									}
								}).then(res => {

									that.$message('缴费成功');

								})
								.catch(err => {

									console.log(err)
								})
							that.$router.push({
								name: 'payDue',

							})
						} else {
							// 失败
							that.isClicked = false;

							// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							$http.post(URL.addUserMoney, {
									userId: that.id,
									userMoney: that.pay,
									months: that.months,
									serialNumber: json.serialNumber,
									successFailure: '缴费失败',
									payMethod: '微信支付'
								}, {
									dataType: "JSON",
									headers: {
										"Content-Type": "application/json;charsetset=UTF-8",
									}
								}).then(res => {

									that.$message('缴费失败');

								})
								.catch(err => {

									console.log(err)
								})
							that.$router.push({
								name: 'payDue',

							})
						}
					})
			},

			/**
			 * 
			 * 
			 * function 删除图片
			 */
			delImage(index) {
				this.imgArr.splice(index, 1);
				this.files.splice(index, 1);
			},
			/*
			 * params:file
			 * return: 无
			 * function: 提交按钮点击事件
			 * */
			uploadImages() {
				this.$refs.file.click();
			},
			/*
			 * params:file
			 * return: 无
			 * function: 提交按钮点击事件
			 * */
			readFile(file) {
				var ths = this;
				var reader = new FileReader();

				reader.onload = function(e) {
					//					console.log(reader.result);
					//					console.log(e.target.result);
					//					ths.testImage = reader.result;
					ths.imgArr.push(e.target.result);
					//					console.log(ths.imgArr);
				};

				reader.readAsDataURL(file);
			},
			/*
			 * params:file
			 * return: 无
			 * function: 提交按钮点击事件
			 * */
			uploadConfig(e) {
				this.files = Array.from(e.target.files);
				Array.from(e.target.files).forEach((file, index) => {
					this.readFile(file);
				})
				//				this.readFile(e.target.files[0]);
				return;

			},
			/*
			 * params:file
			 * return: 无
			 * function: 提交按钮点击事件
			 * */
			beforeSubmit() {
				let TOKEN = Cookies.get('ADMINTOKEN') || '';

				let formData = new FormData();

				this.files.forEach((file, index) => {
					formData.append('file', file);
				})

				let config = {

					headers: {
						"Content-Type": "multipart/form-data",
						"Authorization": TOKEN
					}

				};
				let vm = this;
				$http.post(this.upImg, formData, config).then(function(res) {
						if(res.data.code == 200) {
							vm.imgSrc = res.data.flag;
							vm.submit();
							// console.log(vm.duesPay)

						}

					})
					.catch(err => {
						console.log(err);
					})
			},
			/*
			 * params:file
			 * return: 无
			 * function: 提交按钮点击事件
			 * */
			handleChange(file, fileList) {
				console.log(fileList);
				this.imgList = fileList;

				//				if(fileList.length == 2) {
				//					this.$layer.msg("最多添加两张图片")
				//				}

			},
			/*
			 * params:file
			 * return: 无
			 * function: 提交按钮点击事件
			 * */
			handlePreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			/*
			 * params:文件对象,文件列表
			 * return: 无
			 * function: 上传文件
			 * */
			handleRemove(file, fileList) {
				var arr = [];
				fileList.forEach((item, i) => {
					arr.push({
						url: item.url
					})
				})
				this.imgList = arr;
			},
			/*
			 * params:file
			 * return: 无
			 * function: 上传图片
			 * */
			success(file, fileList) { //上传图片
				console.log(file, fileList);
				this.imgList.push({
					url: file.picUrl || ''
				})
			},
			/*
			 * params:无
			 * return: 无
			 * function: 最多上传多少图片
			 * */
			limitLayer() {
				//				layer.msg('最多上传1张图片');
				this.$layer.alert('最多上传5张图片');
			},
			tab(index) {

				this.num = index;
			},
			getPay() {
				if(parseInt(this.months) < 1 || parseInt(this.months) > 13) {
					this.$message('请输入1到13整月数字');
				}

				this.showPay = true;
				var ths = this;
				$http.post(URL.payment, qs.stringify({
						userId: this.id,
						months: this.months
					})).then(function(res) {
						if(res.data.code == 200) {
							ths.pay = res.data.flag.duesPay;
							ths.auditState = res.data.flag.auditState;
						}

					})
					.catch(err => {
						console.log(err);
					})
			},
			payHistory() {
				this.$router.push({
					name: 'payHistory'
				})
			},
			submit() {
				let TOKEN = Cookies.get('ADMINTOKEN') || '';
				const vm = this;
				$http.post(URL.addDuesPay, {
						userId: this.id,
						duesPay: this.duesPay,
						url: this.imgSrc
					}, {
						dataType: "JSON",
						headers: {
							"Content-Type": "application/json;charsetset=UTF-8",
							"Authorization": TOKEN
						}
					})
					.then(res => {
						if(res.data.code == 200) {
							this.$layer.msg('工资申报成功');
							vm.duesPay = '';
							vm.imgArr = [];
							vm.num = 1;
							// this.$router.push({
							// 	name: 'index'
							// })
						} else {
							this.$layer.msg(res.data.msg);
						}
					})
					.catch(err => {
						console.log(err);

					})
			},
		}
	}
</script>

<style lang="scss">
	#payDue {
		min-height: 100%;
		.el-upload--picture-card {
			/*width: 120px;
			height: 118px;*/
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
			.payHistory {
				position: absolute;
				top: 1rem;
				right: 1rem;
				color: #fff;
			}
		}
		.ulNav {
			overflow: hidden;
			margin: 0;
			background: #f1f1f1;
			.navList {
				box-sizing: border-box;
				float: left;
				width: 50%;
				height: 3rem;
				line-height: 3rem;
				text-align: center;
				&.active {
					color: red;
					background: #fff;
					/*border-bottom: 1px solid red;*/
					.width-line {
						display: inline-block;
						line-height: 40px;
						border-bottom: 1px solid red;
						width: 80%;
					}
				}
			}
		}
		.tabCon {
			margin: 5%;
			.tabList {
				position: relative;
				.pay-mounth {
					margin-bottom: 20px;
				}
				.jisuan {
					font-size: 12px;
					margin-top: 10px;
					color: #9f9f9f;
				}
				.uploadSalary {
					width: 60px;
					height: 60px;
					border: 1px dotted #ccc;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					bottom: 107px;
					left: 16px;
				}
				.pay {
					margin-top: 5%;
					height: 280px;
					border: 1px solid #ccc;
					padding: 0 10px;
					.tip {
						color: #b3b3b3;
						margin-top: 10px;
					}
					.imgWrapper {
						height: 60px;
						width: 60px;
						margin-right: 3%;
						margin-top: 10px;
						float: left;
						position: relative;
						.el-icon-circle-close-outline {
							position: absolute;
							top: 0;
							right: 0;
							font-size: 26px;
						}
						.img {
							display: inline-block;
							width: 100%;
							height: 100%;
						}
					}
				}
				.annotation {
					font-size: 0.8rem;
					line-height: 2.5rem;
					color: #8b8b8b;
				}
				.submit {
					width: 100%;
					background: #e53a1e;
					color: #fff;
					margin-top: 5%;
				}
				.getPay {
					width: 100%;
					background: #e53a1e;
					color: #fff;
				}
				.showPay {
					.title {
						color: #e53d1e;
						line-height: 4rem;
						font-size: 12px;
					}
					.amount {
						font-size: 12px;
						color: #505050;
						.money {
							font-size: 18px;
							color: #e53d1e;
						}
					}
					.goPay {
						margin-top: 2rem;
						width: 100%;
						background: #e53a1e;
						color: #fff;
					}
				}
			}
		}
	}
</style>