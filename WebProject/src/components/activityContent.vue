<template>
	<div id="activityContent">
		<h2>
			{{value.activityTitle || value.studyTitle}}
		</h2>
		<div class="time">{{value.activityTime || value.studyTime}}</div>

		<div class="imgWrapper">
			<div class="img" v-for="(itemImg,indexImg) in value.url" :key="indexImg">
				<img class="imgs" :src="'http://'+itemImg" alt="" />
			</div>

		</div>
		<div class="content" v-html="value.activityContent || value.studyContent">
			{{value.activityContent || value.studyContent}}
		</div>
		<div class="count-down" v-if="closeBtn">
			<span v-if="setInt" class="text-inner">距离本次学习结束还有{{count}}s</span>
			<span @click="close" v-else class="text-inner">已学习（关闭）</span>
		</div>
	</div>
</template>

<script>
	const TIME_COUNT = 60;
	import $axios from '../ajax'
	import $http from 'axios'
	import { mapState, mapMutations } from 'vuex'

	export default {
		name: 'activityContent',
		data() {
			return {
				value: {},
				setInt: false,
				count: '',
				timer: null,
				closeBtn: true,
			}
		},
		async mounted() {
			this.value = this.$route.params.data;
			if(this.$route.params.message) {
				this.closeBtn = false;
			} else {
				const data = (await $axios.post(URL.userStudyRecord, {
					userId: this.id,
					titleId: this.$route.params.data.id,
				})).data.flag;

				if(!data) {
					this.countDown();
				}
			}

		},
		computed: {
			...mapState(['id', 'userInfo', 'signInState'])
		},
		methods: {
			/**
			 * 
			 * function 关闭本页
			 */

			close() {
				this.$router.push({
					name: 'study'
				});
			},

			//设置倒计时
			countDown() {
				if(!this.timer) {
					const ths = this;
					this.count = TIME_COUNT;
					this.setInt = true;
					this.timer = setInterval(async() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.setInt = false;
							clearInterval(this.timer);
							this.timer = null;
							let answerFlag = (await $http.post(URL.addUserStudy, {
								userId: this.id ,
								studyRecord: this.$route.params.data.id,
								study: 1
							}, {
								dataType: "JSON",
								headers: {
									"Content-Type": "application/json;charsetset=UTF-8",
								}
							})).data.flag;
							//							if(answerFlag) {
							//								this.$router.push({
							//									name: 'study'
							//								})
							//							}
						}
					}, 1000)
				}
			}
		},
	}
</script>

<style lang='scss'>
	#activityContent {
		/*display: flex;
		justify-content: center;
		align-items: top;*/
		text-align: center;
		flex-direction: column;
		padding: 0 20px;
		min-height: 100%;
		background: #fff;
		h2 {
			line-height: 40px;
		}
		.time {
			line-height: 40px;
		}
		.content {
			line-height: 40px;
			text-indent: 32px;
			text-align: left;
			overflow: hidden;
			img {
				width: 100%;
				float: left;
				&:after {
					content: '*';
					height: 0;
					clear: both;
					visible: hidden;
				}
			}
		}
		.count-down {
			border: 1px solid #ccc;
			line-height: 50px;
			background: #e53a1e;
			color: #fff;
			margin-top: 20px;
			.text-inner {
				display: inline-block;
				width: 100%;
				height: 100%;
			}
		}
		.imgWrapper {
			width: 100%;
			display: flex;
			flex-direction: column;
			.img {
				margin-right: 2%;
				width: 100%;
				margin-bottom: 10px;
				.imgs {
					width: 100%;
				}
			}
			.img:last-child {
				margin-right: 0;
			}
		}
	}
</style>