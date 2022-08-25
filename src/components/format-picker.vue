<template>
	<label class="format-picker" :for="id">
		<template v-if="label">{{label}}</template>
		<slot name="label"></slot>
		<select id="fruit" :id="id" v-model="value">
			<option>PNG</option>
			<option>SVG</option>
		</select>
	</label>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useVModel } from "@vueuse/core"
const props = defineProps({
	label: {
		type: String,
		default: "Format"
	},
	modelValue: {
		type: String,
		default: "PNG",
		required: true
	}
})
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, "modelValue", emit)
const id = ref(Math.random() * 1000 + "")
</script>
