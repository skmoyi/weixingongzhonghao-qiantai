/**
 * @author: 王雨田
 * @create: 2018/8/21
 * @describe: 请求路径配置
 */

"use stirct";
const base = "wechat"; //开发环境

//const base='';//生产环境
const apiUrl = '67smap.natappfree.cc';
URL = {
	getUser: base + 'admin/getUser', //获取用户信息
	sendMessage: base + '/messageSend', //發送手機驗證碼
	idVerify: base + '/idNumberVerify', //判断身份证号是否存在
	register: base + '/register', //注册
	login: base + '/landing', //登陆
	userMessage: base + '/userMessage', // 登陆展示信息
	forgetPass: base + '/alterPasswordErPhone', //忘记密码
	idVerify: base + '/idNumberVerify', //判断用户身份证是否存在
	getNation: base + '/nationDictionary', //查询民族
	getEducation: base + '/educationDictionary', //获得学历
	getWork: base + '/workDictionary', //工作岗位
	verpass: base + '/findById', //验证密码
	changePass: base + '/alterPassword', //修改密码

	addDetail: base + '/addDetails', //添加黨員信息
	addOrganization: base + '/addOrganization', //添加组织关系审核
	updOrganization: base + '/updOrganization', //修改组织关系审核

	lookData: base + '/allInform', //查询系统通知信息

	activities: base + '/allActivity', //查询活动信息(模糊查询)

	addDuesPay: base + '/addDuesPay', //添加申报信息

	uploadImage: base + '/uploadDuesPayImg', //上传图片

	dueRecord: base + '/allUserRecord', //查询用户缴费记录

	uploadExcel: base + '/uploadExcel',

	getAnswer: base + '/userAllExercisesRecord', //查询用户做题进度
	allTitle: base + '/allTitle', //通过大题id查询小题的信息
	addAnswer: base + '/addExercisesRecord', //添加用户做题目录

	logout: base + '/logoutUser', //退出登陆

	allStudy: base + '/allStudy', //查询学习信息(模糊查询)

	allTemporaryExercises: base + '/allTemporaryExercises', //查询每日更新的题目

	singleIntegral: base + '/singleIntegral', //查询积分信息(单条)
	addUserSignIn: base + '/addUserSignIn', //添加签到信息
	addUserAnswer: base + '/addUserAnswer', //添加答题信息
	addUserStudy: base + '/addUserStudy', //添加学习信息

	payment: base + '/payment', //获取信息

	wechatVerify: base + '/wechatVerify', //获取用户信息

	userPhoneVerify: base + '/userPhoneVerify', //获取用户信息

	partyMember: base + '/userMessage', //查看党员详情

	getSingleOrganization: base + '/singleOrganization', //查询转换组织（单个）回显专用

	allGuidance: base + '/allGuidance', //查詢辦事指南

	weChatPayH5: base + '/weChatPayH5', //请求微信

	getSignKey: base + '/getSignKey', //请求微信
	
	userStudyRecord:base+'/userStudyRecord',//查询这道题有没有答过
	
	userSweet:base+'/userSweet',//获取微信重定向url
	
	createOrder:base+'/createOrder',//支付
	
	addUserMoney: base + '/addUserMoney', //增加缴费记录

	dongtai: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdd4b11d7dea18550&redirect_uri=http://' + apiUrl + '/userInfo&response_type=code&scope=snsapi_base&state=STAT&connect_redirect=1', //dongtai

}

export default URL;