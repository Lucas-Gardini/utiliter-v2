<script setup lang="ts">
const formData = reactive({
	encodedURL: "",
	viewDecodedURL: "",
	decodedURL: "",
	viewEncodedURL: "",
});

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
			<div class="flex flex-col gap-1 w-full">
				<h1 class="text-lg font-bold">Encoder</h1>

				<div class="flex items-center space-x-0 lg:space-x-4 flex-wrap">
					<div class="form-control w-[100%] lg:w-[49%]">
						<label>Encoded URL</label>

						<UInput
							v-model="formData.encodedURL"
							icon="i-heroicons-receipt-percent"
						/>
					</div>

					<div class="form-control w-[100%] lg:w-[49%]">
						<label>Decoded URL</label>

						<UInput
							v-model="formData.viewDecodedURL"
							icon="i-heroicons-link"
							disabled
						/>
					</div>
				</div>
			</div>

			<UDivider />

			<div class="flex flex-col gap-1 w-full mt-[20px]">
				<h1 class="text-lg font-bold">Decoder</h1>

				<div class="flex items-center space-x-0 lg:space-x-4 flex-wrap">
					<div class="form-control w-[100%] lg:w-[49%]">
						<label>Decoded URL</label>

						<UInput
							v-model="formData.decodedURL"
							icon="i-heroicons-link"
						/>
					</div>

					<div class="form-control w-[100%] lg:w-[49%]">
						<label>Encoded URL</label>

						<UInput
							v-model="formData.viewEncodedURL"
							icon="i-heroicons-receipt-percent"
							disabled
						/>
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
