<script setup lang="ts">
const formData = reactive({
	encodedSQL: "",
	viewDecodedSQL: "",
	decodedSQL: "",
	viewEncodedSQL: "",
});

function resetForm() {
	formData.encodedSQL = "";
	formData.viewDecodedSQL = "";
}

watch(
	() => formData.encodedSQL,
	() => {
		if (formData.encodedSQL) {
			try {
				formData.viewDecodedSQL = formatSQL(formData.encodedSQL);
			} catch (error) {
				formData.viewDecodedSQL = "SQL inválido";
			}
		} else {
			formData.viewDecodedSQL = "";
		}
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Formatador de SQL
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full">
				<div class="flex items-center flex-wrap">
					<div class="form-control w-[100%]">
						<label>SQL</label>

						<UTextarea v-model="formData.encodedSQL" :rows="6" />

						<div class="flex flex-row justify-between w-full">
							<UButton
								color="sky"
								variant="link"
								class="ml-auto"
								@click="
									fallbackCopyTextToClipboard(
										formData.encodedSQL
									)
								"
							>
								Copiar
							</UButton>
						</div>
					</div>

					<div class="form-control w-[100%]">
						<label>SQL Formatado</label>

						<UTextarea
							v-model="formData.viewDecodedSQL"
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
										formData.viewDecodedSQL
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
