<template>
	<div id="app">
		<h2>vChat</h2>

		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<router-view/>
	</div>
</template>

<style lang="scss">
	#app {
		color: $color;
	}
</style>
