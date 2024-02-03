<script setup lang="ts">
const formData = reactive({
	encodedBase64: "",
	viewDecodedBase64: "",
	decodedBase64: "",
	viewEncodedBase64: "",
});

function resetForm() {
	formData.encodedBase64 = "";
	formData.viewDecodedBase64 = "";
	formData.decodedBase64 = "";
	formData.viewEncodedBase64 = "";
}

function uploadAndConvertFile() {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "image/*";

	input.onchange = (e) => {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const base64 = e.target?.result as string;
				formData.viewEncodedBase64 = base64.split(",")[1];
			};
			reader.readAsDataURL(file);
		}
	};

	input.click();
}

function downloadConvertedFile() {
	const typeOfFile = getFileTypeFromBase64(formData.viewDecodedBase64);

	const blob = base64ToBlob(formData.viewDecodedBase64, typeOfFile);
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = `decoded${typeOfFile}`;
	a.click();
	URL.revokeObjectURL(url);
}

watch(
	() => formData.encodedBase64,
	() => {
		if (formData.encodedBase64) {
			try {
				formData.viewDecodedBase64 = atob(formData.encodedBase64);
			} catch (error) {
				formData.viewDecodedBase64 = "Base64 inválida";
			}
		} else {
			formData.viewDecodedBase64 = "";
		}
	},
	{ deep: true }
);

watch(
	() => formData.decodedBase64,
	() => {
		if (formData.decodedBase64) {
			formData.viewEncodedBase64 = btoa(formData.decodedBase64);
		} else {
			formData.viewEncodedBase64 = "";
		}
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Encoder / Decoder de Base64
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full">
				<h1 class="text-lg font-bold">Encoder</h1>

				<div class="flex items-center flex-wrap">
					<div class="form-control w-[100%]">
						<label>Texto ou Arquivo</label>

						<UTextarea v-model="formData.decodedBase64" :rows="6" />

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								@click="uploadAndConvertFile"
							>
								Enviar Arquivo
							</UButton>

							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.decodedBase64
									)
								"
							>
								Copiar
							</UButton>
						</div>
					</div>

					<div class="form-control w-[100%]">
						<label>Encoded Base64</label>

						<UTextarea
							v-model="formData.viewEncodedBase64"
							:rows="12"
							disabled
						/>

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.viewEncodedBase64
									)
								"
							>
								Copiar
							</UButton>
						</div>
					</div>
				</div>
			</div>

			<UDivider />

			<div class="flex flex-col gap-1 w-full mt-[20px]">
				<h1 class="text-lg font-bold">Decoder</h1>

				<div class="flex items-center flex-wrap">
					<div class="form-control w-[100%]">
						<label>Encoded Base64</label>

						<UTextarea
							v-model="formData.encodedBase64"
							:rows="12"
						/>

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.encodedBase64
									)
								"
							>
								Copiar
							</UButton>
						</div>
					</div>

					<div class="form-control w-[100%]">
						<label>Texto ou Arquivo</label>

						<UTextarea
							v-model="formData.viewDecodedBase64"
							:rows="6"
							disabled
						/>

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								@click="downloadConvertedFile"
							>
								Baixar Arquivo
							</UButton>

							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.viewDecodedBase64
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
