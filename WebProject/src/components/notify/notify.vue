<template>
	<div id="notify">
		<div v-html="content">
			{{content}}
		</div>
	</div>
</template>

<script>
	import URL from '../../urlConfig'
	export default {
		name: 'notify',
		data() {
			return {
				content: ''
			}
		},
		async mounted() {

			await this.getData();
		},
		methods: {
			async getData() {

				this.content = (await this.$axios.post(URL.allGuidance)).data.flag.content;

			}
		}
	}
</script>

<style lang="scss">
	#notify {
		text-align: center;
		padding: 20px;
		background: #fff;
		img {
			width: 100%;
			float: left;
			&:after {
				content: '';
				height: 0;
				display: inline-block;
				clear: both;
				visibility: hidden;
			}
		}
		h1 {
			margin-bottom: 30px;
			text-align: center;
		}
		p {
			text-indent: 28px;
			line-height: 26px;
		}
		div {
			text-align: left;
			line-height: 26px;
			margin: 10px 0;
		}
	}
</style>