<script setup lang="ts">
import { ColorPicker } from "vue-accessible-color-picker";

const toast = useToast();
const contrastRatio = ref(0);

const selectedColor1 = ref("#000000");
const selectedColor2 = ref("#ffffff");

function getContrastRatio(color1: string, color2: string): number {
	const lum1 = getLuminance(color1);
	const lum2 = getLuminance(color2);
	const contrast =
		(Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
	return contrast;
}

function getLuminance(color: string): number {
	const hex = color.replace(/#/g, "");
	const rgb = parseInt(hex, 16);
	const r = (rgb >> 16) & 0xff;
	const g = (rgb >> 8) & 0xff;
	const b = rgb & 0xff;
	const srgb = [r, g, b].map((c) => {
		c /= 255.0;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});
	const lum = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
	return lum;
}

watch(
	() => selectedColor1.value,
	() => {
		contrastRatio.value = getContrastRatio(
			selectedColor1.value,
			selectedColor2.value
		);
	}
);

watch(
	() => selectedColor2.value,
	() => {
		contrastRatio.value = getContrastRatio(
			selectedColor1.value,
			selectedColor2.value
		);
	}
);

onMounted(() => {
	contrastRatio.value = getContrastRatio(
		selectedColor1.value,
		selectedColor2.value
	);
});
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Proporção de Contraste
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex flex-row items-start gap-4 flex-wrap">
					<div class="form-control min-w-[30%] text-black">
						<ColorPicker
							:color="selectedColor1"
							@color-change="
								(color) => (selectedColor1 = color.cssColor)
							"
							defaultFormat="hex"
							alpha-channel="hide"
							:visibleFormats="['hex']"
						>
						</ColorPicker>
					</div>

					<div class="form-control min-w-[30%] text-black">
						<ColorPicker
							:color="selectedColor2"
							@color-change="
								(color) => (selectedColor2 = color.cssColor)
							"
							defaultFormat="hex"
							alpha-channel="hide"
							:visibleFormats="['hex']"
						/>
					</div>

					<div
						class="flex flex-col items-center justify-center h-full min-w-[30%] mt-auto mb-auto"
					>
						<h1 class="text-lg">Proporção de Contraste</h1>
						<h2>
							<span>{{ selectedColor1 }}</span>
							<span> | </span>
							<span>{{ selectedColor2 }}</span>
						</h2>

						<h2
							class="text-4xl flex flex-row justify-center items-center gap-5"
						>
							{{ contrastRatio.toFixed(2) }} : 1
							<span
								class="text-4xl"
								:class="
									contrastRatio >= 4.5
										? 'i-heroicons-check-badge text-green-500'
										: 'i-heroicons-x-circle text-red-500'
								"
							/>
						</h2>
					</div>
				</div>
			</div>
		</div>
	</UCard>
</template>
