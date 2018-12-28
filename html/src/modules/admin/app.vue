<template>
	<div>
		<h1>hello Vue</h1>
		<vue-checkbox v-model="ck"></vue-checkbox>自动登录
		<h2>www</h2>
		{{$data}}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ck:true
			}
		}
	}
</script>

<style>

</style>
