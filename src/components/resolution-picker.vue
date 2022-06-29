<template>
	<label class="resolution-picker" :for="id">
		<template v-if="label">{{label}}</template>
		<slot name="label"></slot>
		<div class="picker-inputs">
			<input type="number" class="w" :id="id"
				:disabled="disabled" v-model="w" @change="updateHeight">
			<div class="divider">x</div>
			<input type="number" class="h"
				:disabled="disabled" v-model="h" @change="updateWidth">
		</div>
	</label>
</template>

<style lang="scss">
	.resolution-picker {
		.picker-inputs {
			margin-top: calc(var(--spacing) * .25);
			display: grid;
			grid-template-columns: 1fr 1rem 1fr;
			gap: .5rem;
			> .divider {
				text-align: center;
				padding: var(--form-element-spacing-vertical) 0;
			}
			> input {
				text-align: center;
			}
		}
	}
</style>

<script setup lang="ts">
import { computed, ref } from "vue"
const props = defineProps({
	label: {
		type: String,
		default: "Resolution"
	},
	disabled: {
		type: Boolean,
		default: false
	},
	w: {
		type: Number,
		default: 450,
		required: true
	},
	h: {
		type: Number,
		default: 680,
		required: true
	},
	ratioX: {
		type: Number,
		default: 19
	},
	ratioY: {
		type: Number,
		default: 25
	}
})
const emit = defineEmits(['update:w', 'update:h'])
const id = ref(Math.random() * 1000 + "");
const w = computed({
  get: () => props.w,
  set: value => emit('update:w', value)
})
const h = computed({
  get: () => props.h,
  set: value => emit('update:h', value)
})
function updateWidth() {
	w.value = +(h.value * props.ratioX / props.ratioY).toFixed(0)
}
function updateHeight() {
	h.value = +(w.value * props.ratioY / props.ratioX).toFixed(0)
}
</script>
