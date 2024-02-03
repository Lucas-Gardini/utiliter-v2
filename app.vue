<script setup lang="ts">
const isMobile = ref(false);

function checkMobileSize() {
	isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
	checkMobileSize();
	window.addEventListener("resize", checkMobileSize);
});
</script>

<template>
	<main>
		<LayoutNavbar :is-mobile="isMobile" />
		<ThemeToggle />

		<Suspense>
			<div :class="!isMobile ? 'get-off-nav' : ''" class="app-content">
				<NuxtPage />
			</div>
		</Suspense>

		<UNotifications />
	</main>
</template>

<style scoped lang="scss">
main {
	display: flex;
	flex-direction: row;
	height: 100vh;
}

main > .app-content {
	flex: 1;
	overflow-y: auto;
}

main > .app-content.get-off-nav {
	position: relative;
	top: 0;
	transition: top 0.3s ease-in-out;

	padding: 15px;
}
</style>
