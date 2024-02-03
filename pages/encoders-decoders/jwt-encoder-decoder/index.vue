<script setup lang="ts">
const formData = reactive({
	encodedJWT: "",
	viewDecodedJWT: "",
	decodedJWT: "",
	viewEncodedJWT: "",
});

function resetForm() {
	formData.encodedJWT = "";
	formData.viewDecodedJWT = "";
}

watch(
	() => formData.encodedJWT,
	() => {
		if (formData.encodedJWT) {
			try {
				formData.viewDecodedJWT = formatJSON(
					JSON.stringify(decodeJWT(formData.encodedJWT))
				);
			} catch (error) {
				formData.viewDecodedJWT = "JWT inválida";
			}
		} else {
			formData.viewDecodedJWT = "";
		}
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Decoder de JWT
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full">
				<h1 class="text-lg font-bold">Decoder</h1>

				<div class="flex items-center flex-wrap">
					<div class="form-control w-[100%]">
						<label>JWT</label>

						<UTextarea v-model="formData.encodedJWT" :rows="6" />

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.encodedJWT
									)
								"
							>
								Copiar
							</UButton>
						</div>
					</div>

					<div class="form-control w-[100%]">
						<label>Decoded JWT</label>

						<UTextarea
							v-model="formData.viewDecodedJWT"
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
										formData.viewDecodedJWT
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
