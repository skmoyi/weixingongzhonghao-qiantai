<template>
	<div id="index">

		<!--<div class="nav">
			<div class="list" @click="goDetail(0)">
				<div class="imgWrapper"><img class="img" src="../assets/index/dyInfo.png" alt="" /></div>
				<div class="list-text">党员信息完善</div>
			</div>
			<div class="list" @click="goDetail(1)">
				<div class="imgWrapper"><img class="img" src="../assets/index/jiaona.png" alt="" /></div>
				<div class="list-text">党费缴纳</div>
			</div>
			<div class="list" @click="goDetail(2)">
				<div class="imgWrapper"><img class="img" src="../assets/index/zhuanjie.png" alt="" /></div>
				<div class="list-text">组织关系转接</div>
			</div>
			<div class="list" @click="goDetail(3)">
				<div class="imgWrapper"><img class="img" src="../assets/index/zixun.png" alt="" /></div>
				<div class="list-text">咨讯学习</div>
			</div>
		</div>
		<div class="line-bg"></div>
		<div class="systemInfo">
			<div class="news">
				<div v-for="(item,index) in tableData" :key="index">{{item.informContent}}</div>
			</div>
		</div>-->
		<div class="activity">
			支部活动
		</div>
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<!--<div class="content-list">
				<div class="content-title"><span class="dot"></span>安徽创想市场投资股份有限公司党支部召开全体党员会议，开展7月份“党员学习活动日”集体学习活动。公司全体共产党员、积极分子参加了会议，党支部书记张毅主持会议并带领大家学习了相关内容。</div>
				<div class="imgWrapper">
					<img class="img" src="../assets/huodong01.jpg" alt="" />
					<img class="img" src="../assets/huodong01.jpg" alt="" />

				</div>
			</div>-->
				<div v-for="(item,index) in tableDatas" :key="index">
					<div @click="goActivity(item)" class="content-list" v-if="item.url.length==0">
						<div v-html="item.activityTitle" class="content-title-noimage"><span class="dot"></span>{{item.activityTitle}}</div>
					</div>
					<div @click="goActivity(item)" class="content-list" v-if="item.url.length>0">
						<div v-html="item.activityTitle" class="content-title"><span class="dot"></span>{{item.activityTitle}}</div>
						<div class="imgWrapper">
							<div class="img" v-for="(itemImg,indexImg) in item.url" :key="indexImg">
								<img class="imgs" :src="'http://'+itemImg" alt="" />
							</div>

						</div>
					</div>

				</div>
				<!--<div :class="loadMoreHide ? 'load-more-hide' : 'load-more-normal'" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
				<span v-show="loadingShow">加载中</span>
			</div>-->
				<!--<div class="content-list">
				<div class="content-title"><span class="dot"></span>安徽创想市场投资股份有限公司党支部召开全体党员会议，开展7月份“党员学习活动日”集体学习活动。公司全体共产党员、积极分子参加了会议，党支部书记张毅主持会议并带领大家学习了相关内容。</div>
				<div class="imgWrapper">
					<img class="img" src="../assets/huodong01.jpg" alt="" />
					<img class="img" src="../assets/huodong01.jpg" alt="" />

				</div>
			</div>-->
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import axios from '../ajax.js'
	import URL from '../urlConfig.js'
	import $http from 'axios'
	import QS from 'qs'
	import * as Cookies from 'tiny-cookie'
	import Bscroll from 'better-scroll'
	export default {
		name: 'index',
		data() {
			return {
				tableData: [],
				tableDatas: [],
				pagesize: 1000, //默认每页数据量
				currentPage: 1, //当前页码
				busy: false,
				loadingShow: false,
				totalPage: 1,
				loadMoreHide: false,
			}
		},
		computed: {
			...mapState(['auditState']),
		},
		
		mounted() {
			setTimeout(() => {
				
				if(this.auditState){
					this.$router.push({
						name:'partymember'
					})
				}

				this.$route.query.phone && sessionStorage.setItem('phone', this.$route.query.phone);
				if(sessionStorage.getItem('phone')) {
					this.$store.dispatch('getPhoneA', sessionStorage.getItem('phone'));
				}

				//this.getUserInfo();
				this.getLookData();
				//this.getActivity();
				this.loadData();
			}, 100)

		},
		
		methods: {
			...mapMutations(['getUserInfo']),
			//活动详情
			goActivity(val) {

				this.$router.push({
					name: 'activityContent',
					params: {
						data: val,
						message: 'huodong'
					}
				})
			},

			loadData() {
				
				axios.post(URL.activities, {
						pageSize: this.pagesize,
						currentPage: this.currentPage,
					})
					.then((res) => {
						this.tableDatas = this.tableDatas.concat(res.data.flag.list);
						this.totalPage = res.data.flag.totalPage;

						this.$nextTick(() => {

							if(!this.scroll) {
								this.scroll = new Bscroll(this.$refs.wrapper, {
									click: true,
									probeType: 3,
								});

								this.scroll.on('touchEnd', (pos) => {
									// 下拉动作
									if(this.currentPage < this.totalPage) {
										console.log(pos);
										if(pos.y < -50) {
											this.currentPage++;
											this.loadData();
										}
									}
								})

							} else {
								this.scroll.refresh()
							}
						})
					})
					.catch(err => {
						this.$layer.msg('请求出错，请稍后重试')
					})
			},
			//加载更多
			loadMore: function() {
				this.currentPage++;
				this.busy = true;
				this.loading = true;

				//官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
				setTimeout(() => {
					//这里请求接口去拿数据，实际应该是调用一个请求数据的方法
					//this.getActivity();
					this.busy = false;
					this.loading = false;
				}, 1000);
			},
			//獲取活動信息
			getActivity() {
				axios.post(URL.activities, {
						pageSize: this.pagesize,
						currentPage: this.currentPage,
					}).then(res => {

						this.tableDatas = this.tableDatas.concat(res.data.flag.list);
						console.log(this.tableDatas);
						this.totalPage = res.data.flag.totalPage;

						//						this.totalCount = res.data.flag.totalCount;
					})
					.catch(err => {
						this.$layer.msg("请求超时，请稍后重试");
					})
			},
			//查询通知
			getLookData() {
				axios.post(URL.lookData, {
						currentPage: 1,
						pageSize: 2,
					}).then(res => {
						//console.log(res.data)
						this.tableData = res.data.flag.slice(0, 2);
					})
					.catch(err => {
						this.$layer.msg('请求失败，请稍后重试')
					})
			},
			//获取用户信息
			getUser() {

				axios.post(URL.userMessage, {
						phone: this.$route.query.phone
					})
					.then((res) => {
						
						//						if(res.data.code == '1') {
						//
						//						} else {
						//							this.$router.push("/login");
						//						}

					})
					.catch(err => {
						console.log(err);
						this.$layer.msg("请求出错，请稍后重试");
					})
			},
			//具体页面

			goDetail(val) {

				if(val == 0) {

					this.$router.push({
						name: 'partymember'
					})
				} else if(val == 1) {
					this.$router.push({
						name: 'payDue'
					})
				} else if(val == 2) {
					this.$router.push({
						name: 'organizationRelation'
					})
				} else if(val == 3) {
					this.$router.push({
						name: 'study'
					})
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	#index {
		height: 100%;
		color: #717171;
		.nav {
			height: 20%;
			display: flex;
			flex-direction: row;
			align-items: center;
			background: url(../assets/index/bg-index.png);
			background-size: 100% 100%;
			.list {
				flex: 1;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				.imgWrapper {
					display: flex;
					align-items: center;
					justify-content: center;
					.img {
						width: 51%;
					}
				}
				.list-text {
					font-size: 0.8rem;
					margin-top: 10%;
					color: #fff;
				}
			}
		}
		.line-bg {
			height: 10px;
			background: #f1f1f1;
		}
		.systemInfo {
			margin: 10px;
			height: 6%;
			background: url(../assets/index/systemInfo.png) no-repeat;
			background-position: 0;
			background-size: 29px 30px;
			padding-left: 34px;
			.news {
				height: 100%;
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				align-items: left;
			}
		}
		.activity {
			height: 3%;
			padding: 3%;
			font-size: 1.3rem;
			display: flex;
			align-items: center;
			background: #f1f1f1;
		}
		.wrapper {
			height: 63%;
			overflow: hidden;
			.content {
				padding: 0 10px;
				.load-more-normal {
					text-align: center;
					height: 60px;
					line-height: 60px;
				}
				.load-more-hide {
					height: 0;
				}
				.content-list {
					padding-top: 5px;
					padding-bottom: 15px;
					border-bottom: 1px solid #f1f1f1;
					.content-title-noimage {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-moz-line-clamp: 3;
						-webkit-box-orient: vertical;
						line-height: 32px;
						.dot {
							display: inline-block;
							width: 3px;
							height: 3px;
							background: #969896;
							vertical-align: middle;
							margin-right: 3%;
							border-radius: 50%;
						}
					}
					.content-title {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 2% auto;
						.dot {
							display: inline-block;
							width: 3px;
							height: 3px;
							background: #969896;
							vertical-align: middle;
							margin-right: 3%;
							border-radius: 50%;
						}
					}
					.imgWrapper {
						width: 100%;
						display: flex;
						flex-direction: row;
						height: 80px;
						.img {
							margin-right: 2%;
							width: 30%;
							.imgs {
								width: 100%;
								height: 100%;
							}
						}
						.img:last-child {
							margin-right: 0;
						}
					}
				}
			}
		}
	}
</style>