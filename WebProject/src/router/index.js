import Vue from 'vue'
import Router from 'vue-router'

const index = function(resolve){
	require(['@/components/index'],resolve);
}

const login = function(resolve){
	require(['@/components/login'],resolve);
}

const register = function(resolve){
	require(['@/components/register'],resolve);
}

const mainWrapper = function(resolve){
	require(['@/components/mainWrapper'],resolve);
}

const partymember = function(resolve){
	require(['@/components/partymember/partymember'],resolve);
}

const resetPassword = function(resolve){
	require(['@/components/resetPassword'],resolve);
}

const forgetPassword = function(resolve){
	require(['@/components/forgetPassword'],resolve);
}

const organizationRelation = function(resolve){
	require(['@/components/organizationRelation/organizationRelation'],resolve);
}

const payDue = function(resolve){
	require(['@/components/payDue/payDue'],resolve);
}

const payHistory = function(resolve){
	require(['@/components/payDue/payHistory'],resolve);
}

const activityContent = function(resolve){
	require(['@/components/activityContent'],resolve);
}

const answer = function(resolve){
	require(['@/components/answer/answer'],resolve);
}

const question = function(resolve){
	require(['@/components/answer/question'],resolve);
}

const integral = function(resolve){
	require(['@/components/integral/integral'],resolve);
}

const study = function(resolve){
	require(['@/components/study/study'],resolve);
}

const notify = function(resolve){
	require(['@/components/notify/notify'],resolve);
}

const daySign = function(resolve){
	require(['@/components/daySign/daySign'],resolve);
}

const userInfo = function(resolve){
	require(['@/components/userInfo'],resolve);
}




Vue.use(Router)

export default new Router({
	base: '/wechat/',
	routes: [{
			path: '/',
			redirect: '/index',
			component: mainWrapper,
			children: [{
					path: 'index',
					name: 'index',
					component: index,
				},
				{
					path: 'payDue',
					component: payDue,
					name: 'payDue',

				},
				{
					path: 'partymember',
					component: partymember,
					name: 'partymember'
				},
				{
					path: 'organizationRelation',
					name: 'organizationRelation',
					component: organizationRelation
				},
				//				{
				//					path: 'answer',
				//					name: 'answer',
				//					component: answer
				//				},
				{
					path: 'question',
					name: 'question',
					component: question
				},
				{
					path: '/resetPassword',
					name: 'resetPassword',
					component: resetPassword,
				},
				{
					path: '/activityContent',
					name: 'activityContent',
					component: activityContent,
				},
				{
					path: '/payHistory',
					name: 'payHistory',
					component: payHistory
				},

				{
					path: '/integral',
					name: 'integral',
					component: integral,
				},
				{
					path: '/study',
					name: 'study',
					component: study
				},
				{
					path:'daySign',
					name:'daySign',
					component:daySign
				}

			],

		},
		{
			path: '/notify',//通知路由
			name: 'notify',
			component: notify,
		},

		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/register',
			name: 'register',
			component: register
		},

		{
			path: '/forgetPassword',
			name: 'forgetPassword',
			component: forgetPassword,
		},
//		{
//			path:'/userInfo',
//			name:'userInfo',
//			component:'userInfo'
//		}

	]
})