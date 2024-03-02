<script setup lang="ts">
const route = useRoute();

const props = defineProps({
	isMobile: Boolean,
});

const isMenuOpen = ref(false);

const links = [
	[
		{
			label: "LOGO",
			logo: true,
			to: "/",
		},
	],
	[
		{
			label: "Utilitários",
			divider: true,
		},
		{
			label: "Encurtador de URL",
			icon: "i-heroicons-link",
			to: "/utils/url-shortener",
		},
		{
			label: "Proporção de Contraste",
			icon: "i-heroicons-swatch",
			to: "/utils/contrast-ratio",
		},
	],
	[
		{
			label: "Geradores",
			divider: true,
		},
		{
			label: "Commit",
			icon: "i-heroicons-pencil-square",
			to: "/generators/commit-generator",
		},
		{
			label: "Hash",
			icon: "i-heroicons-hashtag",
			to: "/generators/hash-generator",
		},
		{
			label: "CPF/CNPJ",
			icon: "i-heroicons-clipboard-document-list",
			to: "/generators/cpf-cnpj-generator",
		},
		{
			label: "Cartão de Crédito",
			icon: "i-heroicons-credit-card",
			to: "/generators/credit-card-generator",
		},
		{
			label: "Texto (lorem ipsum)",
			icon: "i-heroicons-chat-bubble-bottom-center-text",
			to: "/generators/lorem-ipsum-generator",
		},
	],
	[
		{
			label: "Conversores",
			divider: true,
		},
		{
			label: "Data / Timestamp",
			icon: "i-heroicons-calendar-days",
			to: "/converters/timestamp",
		},
	],
	[
		{
			label: "Encoders / Decoders",
			divider: true,
		},
		{
			label: "Base64",
			icon: "i-heroicons-document-text",
			to: "/encoders-decoders/base64-encoder-decoder",
		},
		{
			label: "JWT",
			icon: "i-heroicons-document-magnifying-glass",
			to: "/encoders-decoders/jwt-encoder-decoder",
		},
		{
			label: "URL",
			icon: "i-heroicons-hashtag",
			to: "/encoders-decoders/url-encoder-decoder",
		},
	],
	[
		{
			label: "Formatadores",
			divider: true,
		},
		{
			label: "JSON",
			icon: "i-heroicons-code-bracket",
			to: "/formatters/json",
		},
		{
			label: "XML",
			icon: "i-heroicons-code-bracket",
			to: "/formatters/xml",
		},
		{
			label: "SQL",
			icon: "i-heroicons-code-bracket",
			to: "/formatters/sql",
		},
	],
];

watchEffect(() => {
	isMenuOpen.value = !props.isMobile;
});
</script>

<template>
	<div>
		<Transition>
			<div
				v-if="isMobile && isMenuOpen"
				class="fixed inset-0 bg-black bg-opacity-50 z-50"
				@click="isMenuOpen = false"
			></div>
		</Transition>

		<UButton
			v-if="isMobile"
			icon="i-heroicons-bars-3"
			color="gray"
			variant="ghost"
			aria-label="Theme"
			@click="isMenuOpen = !isMenuOpen"
			size="xl"
			class="bg-primary"
			style="
				position: fixed;
				border-top-left-radius: 0px;
				border-top-right-radius: 0px;
				border-bottom-left-radius: 0px;
				z-index: 101;
			"
		/>

		<UVerticalNavigation
			:links="links"
			:ui="{
				wrapper: 'border-s border-gray-200 dark:border-gray-800',
				base: 'group border-s -ms-px lg:leading-6 before:hidden pl-3 pt-1',
				padding: 'p-0 ps-4',
				rounded: '',
				font: '',
				ring: '',
				active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
				inactive:
					'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
			}"
			:class="
				isMobile
					? `floating pt-12 ${isMenuOpen ? 'opened' : ''}`
					: 'normal'
			"
			class="bg-white dark:bg-slate-900 min-w-[75%] max-w-[75%] sm:min-w-[250px] sm:max-w-[250px] pt-0 sm:pt-5 sm:pl-1 sm:pr-1 h-screen"
		>
			<template #icon="{ link }">
				<div
					v-if="link.logo"
					class="flex flex-row items-center gap-5 text-xl"
					:class="isMobile ? 'pt-16' : ''"
				>
					<img src="/logo.png" alt="Logo" class="h-12 w-12" />
					<h1 class="font-black dark:text-white">Utiliter</h1>
				</div>
				<div v-else class="flex items-center my-auto">
					<span
						v-html="!link.divider ? '&nbsp;&nbsp;&nbsp;&nbsp;' : ''"
					></span>
					<UIcon :name="link.icon" class="text-base" />
				</div>
			</template>

			<template #default="{ link }">
				<span
					v-if="!link.logo"
					:class="
						!link.divider
							? 'group-hover:text-primary relative'
							: 'group-hover:text-gray-500 dark:group-hover:text-gray-400 relative disable-parent-hover'
					"
					v-html="link.label"
				></span>
				<span v-else></span>
			</template>
		</UVerticalNavigation>
	</div>
</template>

<style scoped lang="scss">
.floating {
	transition: all 0.3s ease-in-out;

	position: fixed;
	top: 0;
	transform: translateX(-100%);
	bottom: 0;
	z-index: 100;

	&.opened {
		transform: translateX(0);
	}
}

.normal {
	position: relative;
}
</style>
