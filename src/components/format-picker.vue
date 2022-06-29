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
import { computed, ref } from "vue"
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
const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
const id = ref(Math.random() * 1000 + "");
</script>
