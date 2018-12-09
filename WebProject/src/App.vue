<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import axios from './ajax.js'
	import URL from './urlConfig.js'
	import $http from 'axios'
	import QS from 'qs'
	import * as Cookies from 'tiny-cookie'
	export default {
		name: 'App',
		mounted() {
//			this.$route.query.phone && sessionStorage.setItem('phone', this.$route.query.phone);
//			if(sessionStorage.getItem('phone')) {
//				this.$store.dispatch('getPhoneA', sessionStorage.getItem('phone'));
//			}
//
//			this.getUserInfo();
		},
		methods:{
			...mapMutations(['getUserInfo'])
		}
	}
</script>

<style lang="scss">
	@import "styles/sass/reset.scss";
	@import "styles/sass/common.scss";
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		background: #fff;
	}
</style>