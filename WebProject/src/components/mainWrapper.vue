<template>
	<div id="mainWrapper">
		<router-view/>
	</div>
</template>

<script>
	import URL from '../urlConfig'
	import $http from 'axios'
	import qs from 'qs'
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: 'mainWrapper',
		data() {
			return {
				userInfo: {

				},
				id: '',
				code: '',
			}
		},
		mounted() {
			//this.getUser();
			
			this.getUserInfo();

		},
		computed: {
			...mapState(['phone','auditState']),
		},
		methods: {
			getUser() {
				console.log(document.cookie);
				//				if(!document.cookie('openId')){
				window.location.href = URL.dongtai;

				//				}
				//					.then(res => {
				//						console.log(res.data.code);
				//						if(res.data.code == 200) {
				//							
				//
				//							this.code = this.getCookie('openId');
				//
				//							this.id = res.data.wechatId;
				//
				//							this.getUserInfo();
				//						} else {
				//							this.$router.push({
				//								name: 'login'
				//							})
				//						}
				//					})
				//					.catch(err => {
				//						console.log(err);
				//					})
			},

			async getUserInfo() {

				try {
					this.userInfo = (await $http.post(URL.userPhoneVerify, qs.stringify({
						userPhone: this.phone || this.$route.query.phone || localStorage.getItem('phone')
					}))).data

					if(this.userInfo.code == 200 && this.userInfo.flag) {
						this.$store.commit('getUserInfo', this.userInfo.flag);
						this.$store.commit('getID', this.userInfo.flag.id);
						localStorage.setItem('id',this.userInfo.flag.id);
						
						if(parseInt(this.userInfo.flag.auditState) !== 1) {
							this.$layer.msg('填写党员申请,等待申请通过可进行操作');
							this.$router.push({
								name: 'partymember'
							})
							
							this.$store.dispatch('getAuditStateA',true);
						}
					} else {
						
						localStorage.setItem('url',window.location.href)
						this.$router.push({
							name: 'login',
						})
					}
				} catch(err) {

					console.log(err);
				}

			},

			getCookie: function(cname) {    
				var name = cname + "=";
				console.log(document.cookie);    
				var ca = document.cookie.split(';');    
				for(var i = 0; i < ca.length; i++) {     
					var c = ca[i];     
					while(c.charAt(0) == ' ') c = c.substring(1);     
					if(c.indexOf(name) != -1) {      
						return c.substring(name.length, c.length);     
					}    
				}    
				return "";   
			},

		}
	}
</script>

<style lang="scss">
	#mainWrapper {
		min-height: 100%;
	}
</style>