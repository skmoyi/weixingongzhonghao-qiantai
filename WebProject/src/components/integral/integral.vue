<template>
	<div id="integral">
		<div class="userInfo">

			<div class="imgWrapper"><img class="img" src="../../assets/touxiang.png" alt="" /></div>
			<div class="userName">{{userInfo.name}}</div>
		</div>
		<div class="bottom-wrapper">
			<div class="jifen"><img class="jifen-image" src="../../assets/jifen.png" alt="" />当前积分<span class="right right-part"><span class="number">{{userIntegralInfo.allIntegral}}</span>分</span>
			</div>
			<div class="common">
				<img class="jifen-image" src="../../assets/signed.png" alt="" />签到
				<div class="right">
					<span class="common_left">
						已签到
						<span class="commonNumber">{{userIntegralInfo.signInNumber||0}}</span> 天
					</span>
					<span class="common_right">
						<span v-if="!signInState" @click="signIn" class="text_inner">签到</span>
					<span v-if="signInState" class="text_inner">已签到</span>
					</span>
				</div>
			</div>
			<div class="common">
				<img class="jifen-image" src="../../assets/study.png" alt="" />学习
				<div class="right">
					<span class="common_left">
						剩
						<span class="commonNumber">{{(5-parseInt(userIntegralInfo.study)||0)}}</span> 篇文章
					</span>
					<span class="common_right">
						<router-link to="study">学习</router-link>
					</span>
				</div>
			</div>
			<div class="common">
				<img class="jifen-image" src="../../assets/answer.png" alt="" />答题
				<div class="right">
					<span class="common_left">
						剩
						<span class="commonNumber">{{(5-parseInt(titleCount))||0}}</span> 道题
					</span>
					<span class="common_right">
						<span class="text_inner" @click="goQuestion">去答题</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import URL from '../../urlConfig'
	import $axios from '../../ajax'
	import $http from 'axios'
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: "integral",
		data() {
			return {
				titleCount: '',
				answer: {},
				disableAnswer: false,
				userIntegralInfo: {
					study: 0,
					allIntegral: 0,
					signInNumber: 0,
					signIn: 0,
				},
				beforeLoad: false, //判断数据初始加载有没有完成
			}
		},
		computed: {
			...mapState(['id', 'userInfo', 'signInState', 'aduitState'])
		},
		mounted() {
			var ths = this;

			setTimeout(()=>{
				if(this.auditState) {
				this.$router.push({
					name: 'partymember'
				})
			}

			this.getIntegral();
			this.answerInfo();
			},500);

		},
		methods: {
			/**
			 * return 无
			 * function 签到
			 */
			signIn() {
				try {
					if(!this.beforeLoad) {
						return;
					}

					if(parseInt(this.userIntegralInfo.signIn) == 0) {
						$http.post(URL.addUserSignIn, {
								userId: this.id ,
								signIn: 1
							}, {
								dataType: "JSON",
								headers: {
									"Content-Type": "application/json;charsetset=UTF-8",
								}
							})
							.then(res => {

								if(res.data.code == 200) {
									this.$layer.msg('签到成功');
									this.$store.dispatch('getSignInStateA', true);
									this.getIntegral();
								}
							})
					}

				} catch(err) {
					console.log(err);
				}
			},

			//获取积分
			getIntegral() {
				try {
					this.beforeLoad = false;
					$axios.post(URL.singleIntegral, {
							userId: this.id 
						})
						.then(res => {

							if(res.data.code == 200) {
								this.beforeLoad = true;
								if(res.data.flag) {
									this.userIntegralInfo = res.data.flag;
								}

								if(parseInt(this.userIntegralInfo.signIn)) {

									this.$store.dispatch('getSignInStateA', true);
								}
							}
						})
				} catch(err) {
					console.log(err);
				}
			},

			//进入答题界面
			goQuestion() {
				if(this.disableAnswer) {
					return;
				}
				this.$router.push({
					name: 'question',
					query: {
						id: this.answers.id,
						//						titleId: item.titleId,
						userId: this.id ,
						answerNumber: this.titleCount,
						//						answerNumber: item.record ? item.record.split(',').length : 0
					}
				})
			},
			//获取答题记录
			answerInfo() {
				$axios.post(URL.getAnswer, {
						userId: this.id 
					})
					.then(res => {

						if(res.data.code == 200) {
							this.titleCount = res.data.flag.titleCount;
							this.$store.dispatch('getTitleCountA', this.titleCount);

							if(this.titleCount >= 5) {
								this.disableAnswer = true;
							}
							this.answers = res.data.flag;

						}
					})
			},
		}
	}
</script>

<style lang="scss">
	#integral {
		height: 100%;
		overflow: hidden;
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
					width: 50%;
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
		.bottom-wrapper {
			min-height: 100%;
			background: #f1f1f1;
			.jifen {
				height: 54px;
				line-height: 54px;
				background: #fff;
				padding: 0 15px;
				font-size: 12px;
				color: rgb(69, 69, 69);
				margin-bottom: 10px;
				.jifen-image {
					width: 20px;
					height: 20px;
					vertical-align: middle;
					margin-right: 11px;
				}
				.right-part {
					.number {
						font-size: 30px;
						color: rgb(234, 76, 34);
						margin-right: 5px;
					}
				}
			}
			.common {
				height: 54px;
				line-height: 54px;
				background: #fff;
				padding: 0 15px;
				font-size: 12px;
				color: rgb(69, 69, 69);
				>img {
					width: 20px;
					height: 20px;
					vertical-align: middle;
					margin-right: 11px;
				}
				>div {
					.common_left {
						color: rgb(133, 133, 133);
						font-size: 12px;
						.commonNumber {
							color: rgb(234, 76, 34);
						}
					}
					.common_right {
						display: inline-block;
						width: 57.5px;
						height: 25px;
						line-height: 25px;
						background: rgb(234, 76, 34);
						border-radius: 5px;
						font-size: 12px;
						text-align: center;
						margin-left: 8.5px;
						.text_inner {
							color: white;
							display: inline-block;
						}
						>a {
							color: white;
							display: block;
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>