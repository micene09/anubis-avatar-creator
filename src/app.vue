<template>
<div class="container">
	<div class="page">
		<div id="title" class="title-bar">
			<h3 class="title">Anubis Avatar Creator</h3>
		</div>
		<div class="form" id="form">
			<ColorPicker label="Background" v-model="bgcolor" />
			<ColorPicker label="Body" v-model="body" />
			<ColorPicker label="Body lights" v-model="bodyLights" />
			<ColorPicker label="Primary" v-model="primary" />
			<ColorPicker label="Secondary" v-model="secondary" />
			<div class="presets-area">
				<Presets @update:modelValue="onPresetChanged" />
				<label>
					&nbsp;
					<button @click="onClickImport">Import</button>
				</label>
				<label>
					&nbsp;
					<button @click="onClickRandomColors">Random</button>
				</label>
			</div>
			<div class="grid">
				<FormatPicker v-model="format" />
				<ResolutionPicker v-model:w="width" v-model:h="height" :disabled="format === 'SVG'" />
			</div>
			<!-- <div class="colors">
				<div v-for="color in colors"
					class="color" :style="{ background: '#' + color }"></div>
			</div> -->
			<div class="save-area">
				<button @click="onClickExport">Export</button>
				<button @click="download">Download</button>
			</div>
		</div>
		<div class="logo-wrapper" id="preview" :style="{ background: bgcolor }">
			<Logo class="logo"
				:body="body"
				:body-lights="bodyLights"
				:primary="primary"
				:secondary="secondary"
			/>
		</div>
	</div>
</div>
<div class="print-area" ref="printArea" :style="{
		background: bgcolor,
		width: width + 'px',
		height: height + 'px'
	}">
	<Logo class="logo"
		:body="body"
		:body-lights="bodyLights"
		:primary="primary"
		:secondary="secondary"
	/>
</div>
</template>
<script lang="ts" src="./app.ts" />
