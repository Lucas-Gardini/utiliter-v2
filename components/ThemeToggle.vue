<script setup>
const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === "dark";
	},
	set() {
		colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
	},
});
</script>

<template>
	<div class="absolute top-0 right-0 z-50">
		<ClientOnly>
			<UButton
				:icon="
					isDark
						? 'i-heroicons-moon-20-solid'
						: 'i-heroicons-sun-20-solid'
				"
				class="bg-primary hover:bg-primary dark:hover:bg-primary"
				color="gray"
				variant="ghost"
				aria-label="Theme"
				style="
					color: #fff;
					border-top-right-radius: 0px;
					border-top-left-radius: 0px;
					border-bottom-right-radius: 0px;
				"
				size="xl"
				@click="isDark = !isDark"
			/>
			<template #fallback>
				<div class="w-8 h-8" />
			</template>
		</ClientOnly>
	</div>
</template>
