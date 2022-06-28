<template>
	<label class="color-picker" :for="id">
		<div>
			<template v-if="label">{{label}}</template>
			<slot name="label"></slot>
		</div>
		<div class="picker-inputs">
			<input type="color" v-model="value" />
			<input type="text" v-model="value" :id="id" />
		</div>
	</label>
</template>

<style lang="scss">
	.color-picker {
		.picker-inputs {
			margin-top: calc(var(--spacing) * .25);
			display: grid;
			grid-template-columns: 1fr 4fr;
			gap: var(--spacing);
		}
	}
</style>

<script setup lang="ts">
import { computed, ref } from "vue"
const props = defineProps({
	label: {
		type: String,
		default: ""
	},
	modelValue: {
		type: String,
		default: "",
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