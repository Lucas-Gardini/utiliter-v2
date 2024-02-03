<script setup lang="ts">
const formData = reactive({
	encodedXML: "",
	viewDecodedXML: "",
	decodedXML: "",
	viewEncodedXML: "",
});

function resetForm() {
	formData.encodedXML = "";
	formData.viewDecodedXML = "";
}

watch(
	() => formData.encodedXML,
	() => {
		if (formData.encodedXML) {
			try {
				const formattedXML = formatXML(formData.encodedXML);
				formData.viewDecodedXML = formattedXML;
			} catch (error) {
				console.error(error);
				formData.viewDecodedXML = "XML inválido";
			}
		} else {
			formData.viewDecodedXML = "";
		}
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Formatador de XML
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full">
				<div class="flex items-center flex-wrap">
					<div class="form-control w-[100%]">
						<label>XML</label>

						<UTextarea v-model="formData.encodedXML" :rows="6" />

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.encodedXML
									)
								"
							>
								Copiar
							</UButton>
						</div>
					</div>

					<div class="form-control w-[100%]">
						<label>XML Formatado</label>

						<UTextarea
							v-model="formData.viewDecodedXML"
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
										formData.viewDecodedXML
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
