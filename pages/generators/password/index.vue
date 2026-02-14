<script setup lang="ts">
const toast = useToast();

const LENGTH_MIN = 8;
const LENGTH_MAX = 128;
const LENGTH_DEFAULT = 16;

const formData = reactive({
	length: LENGTH_DEFAULT,
	uppercase: true,
	lowercase: true,
	numbers: true,
	symbols: true,
	excludeSimilar: false,
	generated: "",
});

const CHAR_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const CHAR_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHAR_NUMBERS = "0123456789";
const CHAR_SYMBOLS = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";

function getCharset(): string {
	let charset = "";
	if (formData.lowercase) charset += formData.excludeSimilar ? CHAR_LOWERCASE.replace(/[ol]/g, "") : CHAR_LOWERCASE;
	if (formData.uppercase) charset += formData.excludeSimilar ? CHAR_UPPERCASE.replace(/[OI]/g, "") : CHAR_UPPERCASE;
	if (formData.numbers) charset += formData.excludeSimilar ? CHAR_NUMBERS.replace(/[01]/g, "") : CHAR_NUMBERS;
	if (formData.symbols) charset += CHAR_SYMBOLS;

	return charset;
}

function generatePassword(): string {
	const charset = getCharset();
	if (!charset) return "";

	const length = Math.max(LENGTH_MIN, Math.min(LENGTH_MAX, formData.length));
	const array = new Uint32Array(length);
	crypto.getRandomValues(array);

	let result = "";
	for (let i = 0; i < length; i++) {
		const idx = array[i] ?? 0;
		result += charset.charAt(idx % charset.length);
	}
	return result;
}

function resetForm() {
	formData.length = LENGTH_DEFAULT;
	formData.uppercase = true;
	formData.lowercase = true;
	formData.numbers = true;
	formData.symbols = true;
	formData.excludeSimilar = false;
	formData.generated = "";
}

function doGenerate() {
	const length = Number(formData.length);
	if (length < LENGTH_MIN || length > LENGTH_MAX) {
		toast.add({
			title: "Tamanho inválido",
			description: `A quantidade de caracteres deve estar entre ${LENGTH_MIN} e ${LENGTH_MAX}.`,
			icon: "i-heroicons-exclamation-triangle",
			color: "amber",
		});
		return;
	}

	const charset = getCharset();
	if (!charset) {
		toast.add({
			title: "Atenção",
			description: "Selecione ao menos um tipo de caractere (maiúsculas, minúsculas, números ou símbolos).",
			icon: "i-heroicons-exclamation-triangle",
			color: "amber",
		});
		return;
	}

	try {
		formData.generated = generatePassword();
	} catch (error: unknown) {
		toast.add({
			title: "Erro",
			description: "Não foi possível gerar a senha.\n\n" + String((error as Error).message),
			icon: "i-heroicons-x-circle",
			color: "red",
		});
	}
}

</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Gerador de Senha
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control min-w-[50px] max-w-[200px]">
						<label>Tamanho ({{ LENGTH_MIN }}-{{ LENGTH_MAX }})</label>
						<UInput
							v-model.number="formData.length"
							type="number"
							:min="LENGTH_MIN"
							:max="LENGTH_MAX"
							icon="i-heroicons-hashtag"
						/>
					</div>
				</div>

				<div class="flex items-start gap-4 flex-wrap gap-y-2">
					<UCheckbox
						v-model="formData.uppercase"
						label="Maiúsculas (A-Z)"
						class="w-auto"
					/>
					<UCheckbox
						v-model="formData.lowercase"
						label="Minúsculas (a-z)"
						class="w-auto"
					/>
					<UCheckbox
						v-model="formData.numbers"
						label="Números (0-9)"
						class="w-auto"
					/>
					<UCheckbox
						v-model="formData.symbols"
						label="Símbolos (!@#...)"
						class="w-auto"
					/>
					<UCheckbox
						v-model="formData.excludeSimilar"
						label="Excluir caracteres parecidos (0, O, 1, l, I)"
						class="w-auto"
					/>
				</div>

				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control w-full">
						<label>Senha gerada</label>
						<UInput
							v-model="formData.generated"
							icon="i-heroicons-key"
							disabled
						/>
						<UButton
							color="sky"
							variant="link"
							class="ml-auto"
							@click="fallbackCopyTextToClipboard(formData.generated)"
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
				<UButton
					icon="i-heroicons-pencil-square"
					size="md"
					color="primary"
					variant="solid"
					label="Gerar"
					style="color: white"
					:trailing="false"
					@click="doGenerate"
				/>
			</div>
		</template>
	</UCard>
</template>
