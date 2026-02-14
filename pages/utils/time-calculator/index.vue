<script setup lang="ts">
import { DateTime } from "luxon";

interface IHorarios {
	entrada: string;
	saida: string;
	resultado: string;
}

const selectedTab = ref(0);

const horarios = ref<IHorarios[]>([
	{
		entrada: "",
		saida: "",
		resultado: "",
	},
]);

const totalElapsed = ref("00:00");

const formDataDatas = reactive({
	inicio: "",
	fim: "",
});

const diffDatasResultado = computed(() => {
	const inicio = formDataDatas.inicio?.trim();
	const fim = formDataDatas.fim?.trim();
	if (!inicio || !fim) return "";

	const dtInicio = DateTime.fromISO(inicio);
	const dtFim = DateTime.fromISO(fim);
	if (!dtInicio.isValid || !dtFim.isValid) return "Data inválida";

	const diff = dtFim.diff(dtInicio, ["days", "hours", "minutes"]);
	const d = Math.floor(diff.days);
	const h = Math.floor(diff.hours);
	const m = Math.floor(diff.minutes);

	if (d < 0 || h < 0 || m < 0) return "Data fim deve ser após data início";

	const partes: string[] = [];
	if (d > 0) partes.push(`${d} ${d === 1 ? "dia" : "dias"}`);
	partes.push(`${h} ${h === 1 ? "hora" : "horas"}`);
	if (m > 0) partes.push(`${m} ${m === 1 ? "minuto" : "minutos"}`);
	return partes.join(" e ");
});

function addTimeLine(index?: number) {
	if (index === undefined)
		horarios.value.push({
			entrada: "",
			saida: "",
			resultado: "",
		});
	else
		horarios.value.splice(index, 0, {
			entrada: "",
			saida: "",
			resultado: "",
		});
}

function calculateTotalElapsed() {
	let total = "00:00";

	horarios.value.forEach((horario) => {
		const totalHorario = horario.resultado.split(":");
		const totalHorarioHoras = Number(totalHorario[0]);
		const totalHorarioMinutos = Number(totalHorario[1]);

		const totalHoras = total.split(":")[0];
		const totalMinutos = total.split(":")[1];

		let somaHoras = totalHorarioHoras + Number(totalHoras);
		let somaMinutos = totalHorarioMinutos + Number(totalMinutos);

		if (somaMinutos >= 60) {
			somaHoras = somaHoras + 1;
			somaMinutos = somaMinutos - 60;
		}

		total = `${somaHoras}`.padStart(2, "0") + ":" + `${somaMinutos}`.padStart(2, "0");
	});

	totalElapsed.value = total;
}

watch(
	horarios,
	(newVal) => {
		newVal.forEach((i, o) => {
			if (i.entrada === "CALCULO_FINAL") return;

			const entrada = i.entrada.split(":");
			const saida = i.saida.split(":");
			const result = Number(saida[0]) * 60 + Number(saida[1]) - (Number(entrada[0]) * 60 + Number(entrada[1]));

			const hora = Math.floor(result / 60);
			const minuto = result % 60;

			if (Number.isNaN(hora) || Number.isNaN(minuto)) return (horarios.value[o].resultado = "");
			if (!Number.isFinite(hora) || !Number.isFinite(minuto)) return (horarios.value[o].resultado = "");

			horarios.value[o].resultado = `${hora}`.padStart(2, "0") + ":" + `${minuto}`.padStart(2, "0");
		});

		calculateTotalElapsed();
	},
	{ deep: true }
);
</script>

<template>
	<UCard>
		<template #header>
			<div class="h-8 font-black text-xl ml-10 sm:ml-0">
				Calculadora de Tempo
			</div>
		</template>

		<div class="min-h-32">
			<UTabs
				v-model="selectedTab"
				:items="[
					{ label: 'Somente horas' },
					{ label: 'Diferença de datas (dias e horas)' },
				]"
				class="w-full mb-5"
			/>

			<div v-if="selectedTab === 0" class="flex flex-col w-full" v-auto-animate>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
					Calcule a diferença entre horários de entrada e saída (somente horas e minutos).
				</p>
				<div class="flex flex-row items-start gap-4 flex-wrap w-[100%] sm:w-[70%] md:w-[50%]">
					<div v-for="(i, o) in horarios" :key="o" class="flex flex-row items-center gap-2 w-full">
						<div class="form-control min-w-[30%]">
							<label>Entrada/Início</label>
							<UInput type="time" v-model="i.entrada" class="w-full" />
						</div>

						<span class="mt-2">+</span>

						<div class="form-control min-w-[30%]">
							<label>Saída/Fim</label>
							<UInput type="time" v-model="i.saida" class="w-full" />
						</div>

						<span class="mt-2">=</span>

						<div class="form-control min-w-[30%]">
							<label>Total</label>
							<UInput type="time" v-model="i.resultado" class="w-full" disabled />
						</div>

						<div class="form-control w-auto">
							<label>&nbsp;</label>
							<div class="flex flex-row gap-1">
								<UButton class="w-[100px]" v-if="o === horarios.length - 1" @click="addTimeLine(undefined)">
									<Icon name="ph:plus"></Icon> Adicionar
								</UButton>
								<UButton class="w-[100px]" v-else @click="() => horarios.splice(o, 1)">
									<Icon name="ph:minus"></Icon> Remover
								</UButton>
								<UButton v-if="o !== horarios.length - 1" @click="() => addTimeLine(o - 1)">
									<Icon name="ph:arrow-down-left-bold"></Icon> Adicionar abaixo
								</UButton>
							</div>
						</div>
					</div>

					<div class="flex flex-row items-center gap-2 w-full">
						<div class="form-control min-w-[30%] opacity-0">
							<label>Entrada/Início</label>
							<UInput type="time" class="w-full" />
						</div>

						<span class="mt-2 opacity-0">+</span>

						<div class="form-control min-w-[30%] opacity-0">
							<label>Saída/Fim</label>
							<UInput type="time" class="w-full" />
						</div>

						<span class="mt-2 opacity-0">=</span>

						<div class="form-control min-w-[30%]">
							<label>Total</label>
							<UInput type="time" v-model="totalElapsed" class="w-full" disabled />
						</div>
					</div>
				</div>
			</div>

			<div v-else class="flex flex-col gap-1 w-full" v-auto-animate>
				<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
					Calcule a diferença entre duas datas e horários (dias, horas e minutos).
				</p>
				<div class="flex items-center gap-4 flex-wrap">
					<div class="form-control min-w-[200px] max-w-[320px]">
						<label>Data e hora início</label>
						<UInput
							v-model="formDataDatas.inicio"
							type="datetime-local"
							icon="i-heroicons-calendar-days"
						/>
					</div>
					<div class="form-control min-w-[200px] max-w-[320px]">
						<label>Data e hora fim</label>
						<UInput
							v-model="formDataDatas.fim"
							type="datetime-local"
							icon="i-heroicons-calendar-days"
						/>
					</div>
				</div>
				<div class="form-control w-full max-w-[400px]">
					<label>Resultado (dias e horas)</label>
					<UInput
						:model-value="diffDatasResultado"
						disabled
						icon="i-heroicons-clock"
					/>
				</div>
			</div>
		</div>
	</UCard>
</template>

<style lang="scss">
::-webkit-datetime-edit-second-field {
	background: #fff;
	color: transparent;
	margin-left: -3px;
	position: absolute;
	width: 1px;
}
</style>
