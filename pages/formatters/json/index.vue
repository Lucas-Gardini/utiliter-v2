<script setup lang="ts">
const formData = reactive({
	encodedJSON: "",
	viewDecodedJSON: "",
	decodedJSON: "",
	viewEncodedJSON: "",
});

function resetForm() {
	formData.encodedJSON = "";
	formData.viewDecodedJSON = "";
}

watch(
	() => formData.encodedJSON,
	() => {
		if (formData.encodedJSON) {
			try {
				formData.viewDecodedJSON = formatJSON(formData.encodedJSON);
			} catch (error) {
				formData.viewDecodedJSON = "JSON inválido";
			}
		} else {
			formData.viewDecodedJSON = "";
		}
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Formatador de JSON
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full">
				<div class="flex items-center flex-wrap">
					<div class="form-control w-[100%]">
						<label>JSON</label>

						<UTextarea v-model="formData.encodedJSON" :rows="6" />

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.encodedJSON
									)
								"
							>
								Copiar
							</UButton>
						</div>
					</div>

					<div class="form-control w-[100%]">
						<label>JSON Formatado</label>

						<UTextarea
							v-model="formData.viewDecodedJSON"
							:rows="16"
							disabled
						/>

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.viewDecodedJSON
									)
								"
							>
								Copiar
							</UButton>
						</div>
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
