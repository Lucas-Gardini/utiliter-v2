<script setup lang="ts">
const toast = useToast();

const commits = ref<Array<{ type: string; message: string; breakingChange: boolean }>>([
	{
		breakingChange: false,
		message: "",
		type: "",
	},
]);

const helps = ref<Array<{ name: string; email: string }>>([
	{
		name: "",
		email: "",
	},
]);

const obs = ref("");
const commitMessage = ref("");

function resetForm() {
	commits.value = [
		{
			breakingChange: false,
			message: "",
			type: "",
		},
	];

	helps.value = [
		{
			name: "",
			email: "",
		},
	];

	obs.value = "";
	commitMessage.value = "";
}

function quickAction(type: string) {
	const lastIndex = commits.value.length - 1;

	if (commits.value[lastIndex].type === "") {
		commits.value[lastIndex].type = (suffixes as any)[type];
	} else {
		commits.value.push({
			breakingChange: false,
			message: "",
			type: (suffixes as any)[type],
		});
	}
}

function generateCommit() {
	const commit = commits.value
		.filter((c) => c.type !== "")
		.map((c) => {
			const breakingChange = c.breakingChange ? "!" : "";

			return `${prefixes[c.type as keyof typeof prefixes]}${breakingChange}: ${c.message}`;
		})
		.join("\n");

	const helpers = helps.value
		.filter((h) => h.name !== "")
		.map((h) => {
			const email = h.email ? ` <${h.email}>` : "";

			return `Co-authored-by: ${h.name} ${email}`;
		})
		.join("\n");

	const _commitMessage = `${commit}\n\n${obs.value.length > 0 ? `${obs.value}\n\n` : ""}${helpers}`;

	fallbackCopyTextToClipboard(_commitMessage.trim(), true);
	commitMessage.value = _commitMessage.trim();

	toast.add({
		title: "Mensagem de commit copiada",
		icon: "i-heroicons-clipboard",
		description: "A mensagem de commit foi copiada para a área de transferência",
	});
}

watch(
	() => commits.value,
	() => {
		if (commits.value[commits.value.length - 1].type !== "") {
			commits.value.push({
				breakingChange: false,
				message: "",
				type: "",
			});
		} else if (commits.value.length > 1) {
			if (commits.value[commits.value.length - 2].type === "") {
				commits.value.pop();
			}
		}
	},
	{ deep: true }
);

watch(
	() => helps.value,
	() => {
		if (helps.value[helps.value.length - 1].name !== "") {
			helps.value.push({
				name: "",
				email: "",
			});
		} else if (helps.value.length > 1) {
			if (helps.value[helps.value.length - 2].name === "") {
				helps.value.pop();
			}
		}
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">Gerador de Commit</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-1 w-full" v-auto-animate>
				<div class="flex flex-row items-center gap-10 mb-5">
					<h1 class="text-lg font-bold">Commits</h1>

					<div class="flex-row gap-5 items-center hidden sm:flex">
						<UButton
							icon="i-heroicons-rocket-launch"
							size="md"
							color="primary"
							variant="link"
							label="Funcionalidade"
							:trailing="false"
							@click="quickAction('feat')"
						/>

						<UButton
							icon="i-heroicons-bug-ant"
							size="md"
							color="red"
							variant="link"
							label="Bug"
							:trailing="false"
							@click="quickAction('fix')"
						/>

						<UButton
							icon="i-heroicons-paint-brush"
							size="md"
							color="pink"
							variant="link"
							label="Estilo"
							:trailing="false"
							@click="quickAction('style')"
						/>

						<UButton
							icon="i-heroicons-cpu-chip"
							size="md"
							color="emerald"
							variant="link"
							label="Peformance"
							:trailing="false"
							@click="quickAction('perf')"
						/>
					</div>
				</div>

				<div v-for="(commit, i) in commits" class="flex items-start space-x-4 flex-wrap" :key="i">
					<div class="form-control w-[40%] sm:w-[30%]">
						<label>Tipo do commit</label>

						<USelect v-model="commit.type" :options="prefixKeys" icon="i-heroicons-bolt" />
					</div>

					<div class="form-control w-[50%]">
						<label>Mensagem do commit</label>

						<UTextarea v-model="commit.message" icon="i-heroicons-document-text" />

						<UButton
							v-if="commit.message !== '' || commit.type !== ''"
							color="red"
							variant="link"
							class="ml-auto"
							@click="commit.message = ''"
						>
							Limpar
						</UButton>
					</div>

					<div class="form-control">
						<label class="opacity-0">-</label>

						<UCheckbox v-model="commit.breakingChange" label="Breaking Change" class="w-auto mt-[0px] sm:mt-auto mb-5 sm:mb-auto" />

						<UButton v-if="commit.message !== '' || commit.type !== ''" class="opacity-0">-</UButton>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-1 w-full">
				<h1 class="text-lg font-bold">Ajudantes</h1>

				<div class="flex flex-col w-[100%]" v-auto-animate>
					<div class="flex flex-row w-full space-x-4" v-for="(helper, i) in helps" :key="i">
						<div class="form-control min-w-[30%]">
							<label>Nome</label>

							<UInput v-model="helper.name" icon="i-heroicons-user" />
						</div>

						<div class="form-control min-w-[50%]">
							<label>Email</label>

							<UInput v-model="helper.email" icon="i-heroicons-envelope" />
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-1 w-full form-control">
				<h1 class="text-lg font-bold">Observações</h1>

				<div class="flex flex-col w-[100%]">
					<UTextarea v-model="obs" />
				</div>
			</div>

			<div class="flex flex-col gap-1 w-full form-control">
				<h1 class="text-lg font-bold">Mensagem de Commit</h1>

				<div class="flex flex-col w-[100%]">
					<UTextarea v-model="commitMessage" :rows="8" max-rows="12" grow disabled />
				</div>

				<UButton color="sky" variant="link" class="ml-auto" @click="fallbackCopyTextToClipboard(commitMessage)"> Copiar </UButton>
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
					@click="generateCommit"
				/>
			</div>
		</template>
	</UCard>
</template>
