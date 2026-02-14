<script setup lang="ts">
const formData = reactive({
	encodedURL: "",
	viewDecodedURL: "",
	decodedURL: "",
	viewEncodedURL: "",
});

const selectedTab = ref(0);

function resetForm() {
	formData.encodedURL = "";
	formData.viewDecodedURL = "";
	formData.decodedURL = "";
	formData.viewEncodedURL = "";
}

watch(
	() => formData.encodedURL,
	() => {
		if (formData.encodedURL) {
			try {
				formData.viewDecodedURL = decodeURIComponent(
					formData.encodedURL
				);
			} catch (error) {
				formData.viewDecodedURL = "URL inválida";
			}
		} else {
			formData.viewDecodedURL = "";
		}
	},
	{ deep: true }
);

watch(
	() => formData.decodedURL,
	() => {
		if (formData.decodedURL) {
			try {
				formData.viewEncodedURL = encodeURIComponent(
					formData.decodedURL
				);
			} catch (error) {
				formData.viewEncodedURL = "URL inválida";
			}
		} else {
			formData.viewEncodedURL = "";
		}
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Encoder / Decoder de URL
			</div>
		</template>

		<div class="min-h-32">
			<UTabs
				v-model="selectedTab"
				:items="[{ label: 'Encoder' }, { label: 'Decoder' }]"
				class="w-full mb-5"
			></UTabs>

			<div v-if="selectedTab === 0" class="flex flex-col gap-1 w-full">
				<h1 class="text-lg font-bold">Encoder</h1>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
					Cole a URL normal (decodificada) e veja o resultado codificado.
				</p>
				<div class="flex items-center space-x-0 lg:space-x-4 flex-wrap">
					<div class="form-control w-[100%] lg:w-[49%]">
						<label>URL (decodificada)</label>

						<UInput
							v-model="formData.decodedURL"
							icon="i-heroicons-link"
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="
								fallbackCopyTextToClipboard(formData.decodedURL)
							"
						>
							Copiar
						</UButton>
					</div>

					<div class="form-control w-[100%] lg:w-[49%]">
						<label>URL codificada</label>

						<UInput
							v-model="formData.viewEncodedURL"
							icon="i-heroicons-receipt-percent"
							disabled
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="
								fallbackCopyTextToClipboard(
									formData.viewEncodedURL
								)
							"
						>
							Copiar
						</UButton>
					</div>
				</div>
			</div>

			<div v-else class="flex flex-col gap-1 w-full">
				<h1 class="text-lg font-bold">Decoder</h1>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
					Cole a URL codificada e veja o resultado decodificado.
				</p>
				<div class="flex items-center space-x-0 lg:space-x-4 flex-wrap">
					<div class="form-control w-[100%] lg:w-[49%]">
						<label>URL codificada</label>

						<UInput
							v-model="formData.encodedURL"
							icon="i-heroicons-receipt-percent"
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="
								fallbackCopyTextToClipboard(formData.encodedURL)
							"
						>
							Copiar
						</UButton>
					</div>

					<div class="form-control w-[100%] lg:w-[49%]">
						<label>URL (decodificada)</label>

						<UInput
							v-model="formData.viewDecodedURL"
							icon="i-heroicons-link"
							disabled
						/>

						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="
								fallbackCopyTextToClipboard(
									formData.viewDecodedURL
								)
							"
						>
							Copiar
						</UButton>
					</div>
				</div>
			</div>
		</div>

		<template #footer>
			<div class="flex justify-end gap-5 h-8">
				<UButton
					icon="i-heroicons-trash"
					size="md"
					color="red"
					variant="solid"
					label="Limpar"
					style="color: white"
					:trailing="false"
					@click="resetForm"
				/>
			</div>
		</template>
	</UCard>
</template>
