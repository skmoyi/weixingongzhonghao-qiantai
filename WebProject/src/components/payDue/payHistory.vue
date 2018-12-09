<template>
	<div id="payHistory">
		<div class="payNone" v-if="payList.length<=0">暂无缴费记录</div>
		<div class="payList" v-for="(item,index) in payList" :key="index">
			<div>支付流水号：{{item.serialNumber}}</div>
			<div>支付时间：{{item.payTime}}</div>
			<div>支付金额：{{item.userMoney}}元</div>
			<div>支付方式：{{item.payMethod}}</div>
			<div :class="[item.successFailure==' 支付成功 ' ? 'green ':'red ', 'payState']">{{item.successFailure}}</div>
		</div>
		<!--<div class="payList">
			<div>支付流水号：218437321237846987321</div>
			<div>支付时间：2018年2月1日</div>
			<div>支付金额：45元</div>
			<div>支付方式：微信支付</div>
			<div class="payState">支付成功</div>
		</div>
		<div class="payList">
			<div>支付流水号：218437321237846987321</div>
			<div>支付时间：2018年2月1日</div>
			<div>支付金额：45元</div>
			<div>支付方式：微信支付</div>
			<div class="payState">支付成功</div>
		</div>-->
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import axios from '../../ajax'
	import URL from '../../urlConfig'
	export default {
		name: 'payHistory',
		data() {
			return {
				payList: [],
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		mounted() {

			axios.post(URL.dueRecord, {
					userId: this.userInfo.id
				})
				.then(res => {
					if(res.data.code == 200) {
						this.payList = res.data.flag;
					}
				})
		},
		methods: {

		},

	}
</script>

<style lang="scss">
	#payHistory {
		min-height: 100%;
		background: #f1f1f1;
		overflow: hidden;
		.payNone {
			text-align: center;
			margin-top: 20px;
		}
		.payList {
			position: relative;
			padding: 5%;
			background: #fff;
			margin-bottom: 2%;
			&:last-child {
				margin-bottom: 0;
			}
			.payState {
				position: absolute;
				top: 40%;
				right: 4%;
				padding: 3px 5px;
				border-radius: 3px;
			}
			.green {
				color: green;
				border: 1px solid green;
			}
			.red {
				color: red;
				border: 1px solid red;
			}
		}
	}
</style>