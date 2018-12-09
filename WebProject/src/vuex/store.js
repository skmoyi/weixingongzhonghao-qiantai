import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../ajax'
import URL from '../urlConfig'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		phone: '',
		userInfo: {},
		id: '',
		signInState: false, //签到状态
		auditState: false, //用户审核状态
		titleCount: '', //答题数
	},
	mutations: {
		getUserInfo: (state) => {

			axios.post(URL.userMessage, {
					phone: sessionStorage.getItem('phone')
				})
				.then(res => {

					state.userInfo = res.data.flag
					state.id = res.data.flag.id
				})
				.catch(err => {
					console.log(err);
				})
		},
		getPhone: (state, val) => {
			state.phone = val
		},
		getUserInfo: (state, val) => {
			state.userInfo = val
		},
		getID: (state, val) => {
			state.id = val
		},
		getSignInState: (state, val) => {
			state.signInState = val
		},
		getAuditState: (state, val) => {
			state.auditState = val
		},
		getTitleCount: (state, val) => {
			
			state.titleCount = val
		}
	},
	actions: {
		getPhoneA: ({
			commit
		}, value) => {
			commit('getPhone', value)
		},
		getSignInStateA: ({
			commit
		}, value) => {

			commit('getSignInState', value)
		},
		getAuditStateA: ({
			commit
		}, value) => {

			commit('getAuditState', value);
		},
		getTitleCountA: ({
			commit
		}, value) => {
			
			commit('getTitleCount', value);
		}
	}

})

export default store;