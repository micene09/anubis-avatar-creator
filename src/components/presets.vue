<template>
	<label class="presets-picker" :for="id">
		<template v-if="label">{{label}}</template>
		<slot name="label"></slot>
		<select id="fruit" :id="id" @change="onChange">
			<option :value="-1"></option>
			<option v-for="(opt, index) in options" :value="index">{{ opt.name }}</option>
		</select>
	</label>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useVModel } from "@vueuse/core";
import { Preset } from "../app";

type PresetOptions = {
	name: string,
	data: Preset
}
const options: PresetOptions[] = [
	{
		"name": "Vale",
		"data": {
			"bgcolor": "transparent",
			"body": "#ff7038",
			"bodyLights": "#7c4028",
			"primary": "#d3cea1",
			"secondary": "#aea7af"
		}
	},
	{
		"name": "Enry",
		"data": {
			"bgcolor": "transparent",
			"body": "#805a77",
			"bodyLights": "#630c53",
			"primary": "#de6cdc",
			"secondary": "#e8f39e"
		}
	},
	{
		"name": "Marti",
		"data": {
			"bgcolor": "transparent",
			"body": "#c0b3f4",
			"bodyLights": "#6a6380",
			"primary": "#177b91",
			"secondary": "#a39fac"
		}
	},
	{
		"name": "Gio",
		"data": {
			"bgcolor": "transparent",
			"body": "#41443e",
			"bodyLights": "#8c8f89",
			"primary": "#93ff72",
			"secondary": "#3543b7"
		}
	},
	{
		"name": "Phil",
		"data": {
			"bgcolor": "transparent",
			"body": "#44423e",
			"bodyLights": "#8f8d88",
			"primary": "#ffd66b",
			"secondary": "#386144"
		}
	},
	{
		"name": "Pablo",
		"data": {
			"bgcolor": "transparent",
			"body": "#716280",
			"bodyLights": "#402163",
			"primary": "#8f61de",
			"secondary": "#f3f077"
		}
	},
	{
		"name": "Fra",
		"data": {
			"bgcolor": "transparent",
			"body": "#6d8062",
			"bodyLights": "#647946",
			"primary": "#a6de61",
			"secondary": "#f3818f"
		}
	}
];
const props = defineProps({
	label: {
		type: String,
		default: "Presets"
	},
	modelValue: {
		type: Object,
		default: () => null
	}
})

const id = ref(Math.random() * 1000 + "");
const emit = defineEmits(["update:modelValue", "click-import", "click-export"])
const data = useVModel(props, "modelValue", emit)

onMounted(() => {
	data.value = null
})
function onChange(payload) {
	const index = +payload.target.value;
	if (index < 0)
		return data.value = null
	const opt = options[+index];
	data.value = opt.data
}
</script>
