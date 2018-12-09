<template>
	<div id="study">
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
						<div v-html="item.studyTitle" class="content-title-noimage"><span class="dot"></span>{{item.studyTitle}}</div>

					</div>
					<div @click="goActivity(item)" class="content-list" v-if="item.url.length>0">
						<div v-html="item.studyTitle" class="content-title"><span class="dot"></span>{{item.studyTitle}}</div>
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
	import Bscroll from 'better-scroll'
	import URL from '../../urlConfig.js'
	import axios from '../../ajax.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		name: 'study',
		data() {
			return {
				tableDatas: [],
				pagesize: 1000, //默认每页数据量
				currentPage: 1, //当前页码
				totalPage: 1,
			}
		},
		computed: {
			...mapState(['auditState']),
		},
		mounted() {
			
			if(this.auditState) {
				this.$router.push({
					name: 'partymember'
				})
			}

			this.loadData();
		},
		methods: {
			//活动详情
			goActivity(val) {

				this.$router.push({
					name: 'activityContent',
					params: {
						data: val
					}
				})
			},

			/**
			 * function 加载详情
			 */
			loadData() {
				axios.post(URL.allStudy, {
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
		},

	}
</script>

<style lang="scss" scoped>
	#study {
		background: #fff;
		.wrapper {
			height: 100vh;
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