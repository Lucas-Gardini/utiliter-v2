<script setup lang="ts">
const PROJECT_URL = "https://mysql-explain.lucasgardini.com/";

function openInNewTab() {
	window.open(PROJECT_URL, "_blank", "noopener,noreferrer");
}
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				MySQL EXPLAIN - Visualização
			</div>
		</template>

		<div class="min-h-32">
			<div class="flex flex-col gap-4">
				<p class="text-gray-600 dark:text-gray-400">
					Ferramenta para análise de <strong>EXPLAIN FORMAT=JSON</strong> do MySQL. Cole a saída do <code class="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm">EXPLAIN FORMAT=JSON</code> no site para gerar uma visualização do plano de execução da query.
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-500">
					O projeto está hospedado em um site externo. Clique no botão abaixo para abri-lo em uma nova aba.
				</p>
				<UButton
					color="primary"
					variant="solid"
					icon="i-heroicons-arrow-top-right-on-square"
					label="Abrir MySQL EXPLAIN em nova aba"
					@click="openInNewTab"
				/>
			</div>
		</div>
	</UCard>
</template>
