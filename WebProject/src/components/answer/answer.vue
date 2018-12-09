<template>
	<div id="answer">
		<div class="card" v-for="(item,index) in answers" :key="index" @click="goQuestion(item)">
			<div class="card-bg">
				<h2>{{item.title}}</h2>
				<div>{{item.percentage}}%共{{item.titleCount}}小题</div>
				<img v-if="item.percentage==100" class="imgComplete" src="../../assets/complete.png" alt="" />
			</div>
			<div class="anserProgress">
				<span class="progressText">答题进度</span>
				<el-progress class="progress" color="#f14a42" :percentage="item.percentage" :show-text='false'></el-progress>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../ajax';
	import $http from 'axios';
	import qs from 'qs';
	export default {
		name: 'answer',
		data() {
			return {
				answers: [],

			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			/*
			 * params:无
			 * return: 无
			 * function:請求數據
			 * */
			goQuestion(item) {

				if(item.percentage !== 100) {
					this.$router.push({
						name: 'question',
						query: {
							id: item.id,
							titleId: item.titleId,
							titleCount: item.titleCount,
							answerNumber: item.record ? item.record.split(',').length : 0
						}
					})
				}
			},
			/*
			 * params:无
			 * return: 无
			 * function:請求數據
			 * */
			getData() {

				axios.post(URL.getAnswer, {
						userId: '1909b6d9-8108-442d-a9a3-bd20fc55c21a'
					})
					.then(res => {
						console.log(res);
						if(res.data.code == 200) {
							this.answers = res.data.flag;
							this.answers.forEach((item, index) => {
								if(!item.record) {
									item.percentage = 0;
								} else {
									//console.log(item.record.split(',').length);
									item.percentage = Math.floor(item.record.split(',').length / item.titleCount * 100)
								}

							})
						}
					})
			},
		}
	}
</script>

<style lang="scss">
	#answer {
		padding: 0 10px;
		overflow: hidden;
		background: #fefefe;
		min-height: 100%;
		.card {
			margin-top: 10px;
			background: #fefefe;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			box-shadow: -2px 2px 10px gray;
			.card-bg {
				position: relative;
				background: #f14a42;
				height: 90px;
				color: #fff;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				padding: 10px;
				h2 {
					font-size: 1.3rem;
					line-height: 1.5rem;
				}
				.imgComplete {
					position: absolute;
					top: 12px;
					right: 0;
					width: 110px;
				}
			}
			.anserProgress {
				line-height: 40px;
				height: 40px;
				font-size: 0.6rem;
				color: #999;
				.progressText {
					display: inline-block;
					padding: 0 10px;
				}
				.progress {
					width: 70%;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
	}
</style>