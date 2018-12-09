<template>
	<div id="question">
		<div class="aa" v-for="(item,index) in titleAll" :key="index" v-if="index==currentTitle">

			<div :ref="'card'+index" class="question-card">
				<div class="question-title">第{{chinese}}题</div>
				<div class="question-content">{{item.content}} </div>
				<div class="question-bottom"><span>{{item.titleType=='1'?'多选':'单选'}}</span><span class="question-number">{{parseInt(currentTitle)+1}}/5</span></div>
			</div>
			<div class="question-card-bg" :style="{'height':cardHeight}"></div>
			<div v-if="item.titleType=='0'" class="button-wrapper">
				<div v-for="(itemO,indexO) in item.optionList">
					<input type="radio" v-model="picked" :value="indexO+1" :id="'choice'+indexO" style="display:none;" />
					<div :class="{'chooseWrapper':isRight,'chooseWrapperErr':isErr,'chooseWrapperXuan':isCommon}"><label class="itemChoose" :for="'choice'+indexO"><span class="optionABC">{{itemO.option}}</span><span class="optionContent">{{itemO.content}}</span></span></label></div>
				</div>
				<!--<input type="radio" v-model="picked" value="B" id="choiceB" style="display:none" />
				<label class="itemChoose" for="choiceB">这里是选项</label>
				<input type="radio" v-model="picked" value="C" id="choiceC" style="display:none" />
				<label class="itemChoose" for="choiceC">这里是选项</label>-->
			</div>
			<div v-if="item.titleType=='1'">
				<div v-for="(itemO,indexO) in item.optionList">
					<input type="checkbox" v-model="pickedArr" :value="indexO+1" :id="'choice'+indexO" style="display:none" />
					<div :class="{'chooseWrapper':isRight,'chooseWrapperErr':isErr,'chooseWrapperXuan':isCommon}"><label class="itemChoose" :for="'choice'+indexO"><span class="optionABC">{{itemO.option}}</span><span class="optionContent">{{itemO.content}}</span></label></div>
				</div>
				<!--<input type="checkbox" v-model="pickedArr" value="B" id="choiceB" style="display:none" />
				<label class="itemChoose" for="choiceB">这里是选项</label>
				<input type="checkbox" v-model="pickedArr" value="C" id="choiceC" style="display:none" />
				<label class="itemChoose" for="choiceC">这里是选项</label>-->
			</div>
			<el-button-group>
				<el-button @click="goHome" class="backHome">返回</el-button>
				<el-button @click="nextTitle" v-if="!isLast" class="next">下一题</el-button>
				<el-button @click="lastTitle" v-if="isLast" class="submit">完成</el-button>
			</el-button-group>
			<div class="rightAnswer" v-if='rightAnswerFlag'>
				正确答案为<span class="color-answer">{{rightAnswer}}</span>
			</div>
		</div>

	</div>
</template>

<script>
	import URL from '../../urlConfig'
	import axios from '../../ajax'
	import $http from 'axios'
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: 'question',
		data() {
			return {
				cardHeight: null,
				isLast: false,
				picked: '',
				pickedArr: [],
				radio: true,
				titleAll: [],
				currentTitle: 0,
				chinese: '',
				isClicked: false,
				rightAnswer: '',
				rightAnswerFlag: false,
				isRight: false, //背景对勾还是叉
				isErr: false, //背景对勾还是叉
				isCommon: true, //背景对勾还是叉
				answer: {}, //答题信息
				answerId: '', //当前题目的id
			}
		},
		watch: {

			currentTitle(val) {
				//				判断是否是最后一题
				if(val == 5 - 1) {
					this.isLast = true;
				}

				this.chinese = this.SectionToChinese(val + 1);
			},

		},
		computed: {
			...mapState(['id', 'userInfo', 'signInState', 'auditState', 'titleCount'])
		},
		async mounted() {

			if(this.auditState) {
				this.$router.push({
					name: 'partymember'
				})
			}

			if(parseInt(this.titleCount) >= 5) {
				this.$router.push({
					name: 'integral'
				})
			}

			if(!this.$route.query.answerNumber) {
				setTimeout(() => {
					this.answerInfo();
				}, 100)
			} else {
				this.currentTitle = parseInt(this.$route.query.answerNumber);
			}

			this.getChinese();
			this.titleAll = (await axios.post(URL.allTemporaryExercises)).data.flag;

			var ths = this;
			for(var i = 0; i < this.titleAll.length; i++) {
				for(var j = 0; j < this.titleAll[i].optionList.length; j++) {

					var obj = {};
					switch(j + 1) {
						case 1:
							obj.option = "A";
							obj.content = ths.titleAll[i].optionList[j];
							ths.titleAll[i].optionList[j] = obj;
							break;
						case 2:
							obj.option = "B";
							obj.content = ths.titleAll[i].optionList[j];
							ths.titleAll[i].optionList[j] = obj;
							break;
						case 3:
							obj.option = "C";
							obj.content = ths.titleAll[i].optionList[j];
							ths.titleAll[i].optionList[j] = obj;
							break;
						case 4:
							obj.option = "D";
							obj.content = ths.titleAll[i].optionList[j];
							ths.titleAll[i].optionList[j] = obj;
							break;
						case 5:
							obj.option = "E";
							obj.content = ths.titleAll[i].optionList[j];
							ths.titleAll[i].optionList[j] = obj;
							break;
						case 6:
							obj.option = "F";
							obj.content = ths.titleAll[i].optionList[j];
							ths.titleAll[i].optionList[j] = obj;
							break;
						case 7:
							obj.option = "G";
							obj.content = ths.titleAll[i].optionList[j];
							ths.titleAll[i].optionList[j] = obj;
							break;
						case 8:
							obj.option = "H";
							obj.content = ths.titleAll[i].optionList[j];
							ths.titleAll[i].optionList[j] = obj;
							break;
					}
					ths.$set(ths.titleAll[i].optionList, j, ths.titleAll[i].optionList[j])
				}
			}

			this.rightAnswer = this.titleAll[this.currentTitle].answer;

			this.$nextTick(() => {
				this.setHeight();
			})

		},
		methods: {
			/*
			 * params:无
			 * return: 无
			 * function:初始獲取第幾題
			 * */
			answerInfo() {
				return axios.post(URL.getAnswer, {
						userId: this.id || localStorage.getItem('id'),
					})
					.then(res => {

						if(res.data.code == 200) {

							this.currentTitle = res.data.flag.titleCount;

							if(this.currentTitle >= 5) {
								this.$message("已答完");
								this.$router.push({
									name: 'integral',
								})
							}

							this.answers = res.data.flag;
							this.answerId = res.data.flag.id;

						}
					})
			},

			/*
			 * params:无
			 * return: 无
			 * function:初始獲取第幾題
			 * */
			getChinese() {

				this.chinese = this.SectionToChinese(parseInt(this.currentTitle) + 1);
			},
			/*
			 * params:无
			 * return: 无
			 * function:数字转换
			 * */
			SectionToChinese(section) {
				//				var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
				//				var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
				//				var chnUnitChar = ["", "十", "百", "千"];
				//				var strIns = '',
				//					chnStr = '';
				//				var unitPos = 0;
				//				var zero = true;
				//				while(section > 0) {
				//					var v = section % 10;
				//					if(v === 0) {
				//						if(!zero) {
				//							zero = true;
				//							chnStr = chnNumChar[v] + chnStr;
				//						}
				//					} else {
				//						zero = false;
				//						strIns = chnNumChar[v];
				//						strIns += chnUnitChar[unitPos];
				//						chnStr = strIns + chnStr;
				//					}
				//					unitPos++;
				//					section = Math.floor(section / 10);
				//				}
				var chnStr = '';

				switch(parseInt(section)) {
					case 1:
						chnStr = "一";
						break;
					case 2:
						chnStr = "二";
						break;
					case 3:

						chnStr = "三";
						break;
					case 4:
						chnStr = "四";
						break;
					case 5:
						chnStr = "五";
						break;
				}

				return chnStr;
			},

			/*
			 * params:无
			 * return: 无
			 * function:請求數據
			 * */
			async lastTitle() {
				try {
					var answer = this.picked ? [this.picked] : this.pickedArr;
					answer = this.number2abc(answer);

					if(!answer) {
						this.$layer.msg('请选择答案');
					} else if(answer == this.titleAll[this.currentTitle].answer) {
						this.isRight = true;
						this.isErr = false;
						this.isCommon = false;
						let flag = (await $http.post(URL.addAnswer, {
							id: this.$route.query.id || this.answerId || '30323582-d594-4ee9-9faf-2effb0342801',
							record: answer
						}, {
							dataType: "JSON",
							headers: {
								"Content-Type": "application/json;charsetset=UTF-8",
							}
						})).data.flag;
						let answerFlag = (await $http.post(URL.addUserAnswer, {
							userId: this.$route.query.userId || this.id,
							answer: 1
						}, {
							dataType: "JSON",
							headers: {
								"Content-Type": "application/json;charsetset=UTF-8",
							}
						})).data.flag

						if(flag) {
							this.picked = "";
							this.pickedArr = [];
							this.currentTitle++;

							this.$router.push({
								name: 'integral'
							})
						}
					} else {
						this.isRight = false;
						this.isErr = true;
						this.isCommon = false;
						this.rightAnswerFlag = true;
						const ths = this;
						setTimeout(async function() {

							let flag = (await $http.post(URL.addAnswer, {
								id: ths.$route.query.id || ths.answerId || '30323582-d594-4ee9-9faf-2effb0342801',
								record: answer
							}, {
								dataType: "JSON",
								headers: {
									"Content-Type": "application/json;charsetset=UTF-8",
								}
							})).data.flag;
							let answerFlag = (await $http.post(URL.addUserAnswer, {
								userId: ths.$route.query.userId || ths.id,
								answer: 0
							}, {
								dataType: "JSON",
								headers: {
									"Content-Type": "application/json;charsetset=UTF-8",
								}
							})).data.flag

							if(flag) {
								ths.picked = "";
								ths.pickedArr = [];
								ths.currentTitle++;

								ths.isClicked = false;
								ths.rightAnswerFlag = false; //控制答案显示隐藏
								ths.isRight = false;
								ths.isErr = false;
								ths.isCommon = true;
								ths.$router.push({
									name: 'integral'
								})
							}

						}, 1000);
					}

				} catch(err) {
					console.log(err);
				}

			},
			/*
			 * params:无
			 * return: 无
			 * function:請求數據
			 * */
			async nextTitle() {
				try {
					if(!this.isClicked) {
						this.isClicked = true;
						var answer = this.picked ? [this.picked] : this.pickedArr;
						answer = this.number2abc(answer);

						if(!answer) {
							this.$layer.msg('请选择答案');
						} else if(answer == this.titleAll[this.currentTitle].answer) {
							this.isRight = true;
							this.isErr = false;
							this.isCommon = false;
							let flag = (await $http.post(URL.addAnswer, {
								id: this.$route.query.id || this.answerId || '30323582-d594-4ee9-9faf-2effb0342801',
								record: answer
							}, {
								dataType: "JSON",
								headers: {
									"Content-Type": "application/json;charsetset=UTF-8",
								}
							})).data.flag;
							let answerFlag = (await $http.post(URL.addUserAnswer, {
								userId: this.$route.query.userId || this.id,
								answer: 1
							}, {
								dataType: "JSON",
								headers: {
									"Content-Type": "application/json;charsetset=UTF-8",
								}
							})).data.flag

							if(flag) {
								this.picked = "";
								this.pickedArr = [];
								this.currentTitle++;
								this.rightAnswer = this.titleAll[this.currentTitle].answer;

								this.isClicked = false;

								this.isRight = false;
								this.isErr = false;
								this.isCommon = true;
							}
						} else {
							this.isRight = false;
							this.isErr = true;
							this.isCommon = false;
							this.rightAnswerFlag = true;
							const ths = this;
							setTimeout(async function() {

								let flag = (await $http.post(URL.addAnswer, {
									id: ths.$route.query.id || ths.answerId || '30323582-d594-4ee9-9faf-2effb0342801',
									record: answer
								}, {
									dataType: "JSON",
									headers: {
										"Content-Type": "application/json;charsetset=UTF-8",
									}
								})).data.flag;

								let answerFlag = (await $http.post(URL.addUserAnswer, {
									userId: ths.$route.query.userId || ths.id,
									answer: 0
								}, {
									dataType: "JSON",
									headers: {
										"Content-Type": "application/json;charsetset=UTF-8",
									}
								})).data.flag

								if(flag) {
									ths.picked = "";
									ths.pickedArr = [];
									ths.currentTitle++;
									ths.rightAnswer = ths.titleAll[ths.currentTitle].answer;
									ths.isClicked = false;
									ths.rightAnswerFlag = false; //控制答案显示隐藏
									ths.isRight = false;
									ths.isErr = false;
									ths.isCommon = true;
								}

							}, 1000);
						}
					}

				} catch(err) {
					console.log(err);
				}

			},
			/*
			 * params:无
			 * return: 无
			 * function:返回主页
			 * */
			number2abc(arr) {

				var newArr = [];
				arr.forEach((item, index) => {

					switch(parseInt(item)) {
						case 1:
							newArr.push("A");
							break;
						case 2:
							newArr.push("B");
							break;
						case 3:
							newArr.push("C");
							break;
						case 4:
							newArr.push("D");
							break;
						case 5:
							newArr.push("E");
							break;
						case 6:
							newArr.push("F");
							break;
						case 7:
							newArr.push("G");
							break;
						case 8:
							newArr.push("H");
							break;
					}

				})

				return newArr.sort().join('');
			},

			/*
			 * params:无
			 * return: 无
			 * function:返回主页
			 * */
			addAnswer(answer) {
				return axios.post(URL.addAnswer, {
					id: this.$route.query.id,
					record: answer
				})
			},
			/*
			 * params:无
			 * return: 无
			 * function:返回主页
			 * */

			goHome() {
				this.$router.push({
					name: 'integral'
				})
			},
			/*
			 * params:无
			 * return: 无
			 * function:請求數據
			 * */
			setHeight() {

				var ths = this;

				ths.cardHeight = ths.$refs['card' + ths.currentTitle][0].offsetHeight + 'px';

			},

		}

	}
</script>

<style lang="scss">
	#question {
		box-sizing: border-box;
		min-height: 100%;
		padding: 30px 34px;
		background: url(../../assets/login-top01.png) no-repeat;
		position: relative;
		.rightAnswer {
			text-align: center;
			background: #fff;
			line-height: 47px;
			margin-top: 20px;
			border-radius: 4px;
			box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.5);
			.color-answer {
				color: red;
			}
		}
		.question-card-bg {
			background: rgba(0, 0, 0, 0.5);
			min-height: 160px;
			transform: rotate(-2deg);
			border-radius: 4px;
		}
		.button-wrapper {
			margin-top: 30px;
		}
		.chooseWrapper {
			margin-top: 23px;
			border-radius: 4px;
			background: #fff;
		}
		.chooseWrapperXuan {
			margin-top: 23px;
			border-radius: 4px;
			background: #fff;
		}
		.chooseWrapperErr {
			margin-top: 23px;
			border-radius: 4px;
			background: #fff;
		}
		.itemChoose {
			width: 100%;
			border: 1px solid #dcdfe6;
			/*	height: 47px;*/
			line-height: 47px;
			text-align: center;
			border-radius: 4px;
			box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.5);
			box-sizing: border-box;
			.optionABC {
				float: left;
				margin-left: 10%;
			}
			.optionContent {
				margin-left: -10%;
				padding-left: 10%;
			}
		}
		input:checked+.chooseWrapper {
			.itemChoose {
				background: url(../../assets/duigou@2x.png) no-repeat;
				background-position: 90% center;
				background-size: 10%;
				border: 1px solid #fff;
			}
		}
		input:checked+.chooseWrapperXuan {
			.itemChoose {
				background: url(../../assets/xuanzhong.png) no-repeat;
				background-position: 90% center;
				background-size: 10%;
				border: 1px solid #fff;
			}
		}
		input:checked+.chooseWrapperErr {
			.itemChoose {
				background: url(../../assets/cuowu.png) no-repeat;
				background-position: 90% center;
				background-size: 10%;
				border: 1px solid #fff;
			}
		}
		.el-button-group {
			width: 100%;
			.backHome {
				width: 47%;
				border-radius: 4px;
				height: 47px;
			}
			.next {
				width: 47%;
				float: right;
				border-radius: 4px;
				height: 47px;
			}
			.submit {
				width: 47%;
				float: right;
				border-radius: 4px;
				height: 47px;
			}
		}
		.question-card {
			background: #fff;
			border-radius: 4px;
			box-sizing: border-box;
			padding: 0 20px;
			color: #777;
			margin-bottom: 50px;
			position: absolute;
			top: 30px;
			width: calc(100% - 68px);
			transform: rotate(0deg);
			min-height: 76px;
			z-index: 999;
			font-size: 13px;
			.question-title {
				font-size: 18px;
				text-align: center;
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #e2e2e2;
			}
			.question-content {
				padding: 10px 0;
				line-height: 22px;
				min-height: 60px;
			}
			.question-bottom {
				height: 30px;
				line-height: 30px;
				border-top: 1px solid #e2e2e2;
				overflow: hidden;
				.question-number {
					float: right;
				}
			}
		}
		.el-button {
			width: 100%;
			margin-top: 20px;
			box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.5);
		}
		.el-button+.el-button {
			margin-left: 0;
		}
	}
</style>