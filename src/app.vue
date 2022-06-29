<template>
<div class="container">
	<div class="page">
		<div id="title" class="title-bar">
			<h3 class="title">Anubis Avatar Creator</h3>
			<span class="tools">
				<ThemeSwitch />
				<GitHubRepo :href="repoUrl" class="contrast" />
			</span>
		</div>
		<div class="form" id="form">
			<ColorPicker label="Background" v-model="bgcolor" />
			<ColorPicker label="Body" v-model="body" />
			<ColorPicker label="Body lights" v-model="bodyLights" />
			<ColorPicker label="Primary" v-model="primary" />
			<ColorPicker label="Secondary" v-model="secondary" />
			<div class="grid">
				<Presets @update:modelValue="onPresetChanged" />
				<div class="grid">
					<label>
						&nbsp;
						<button class="outline" @click="onClickImport">I</button>
					</label>
					<label>
						&nbsp;
						<button class="outline" @click="onClickExport">E</button>
					</label>
				</div>
			</div>
			<div class="grid">
				<ResolutionPicker v-model:w="width" v-model:h="height" :disabled="format === 'SVG'" />
				<label>
					&nbsp;
					<button class="outline" @click="onClickRandomColors">Random Colors</button>
				</label>
			</div>
			<!-- <div class="colors">
				<div v-for="color in colors"
					class="color" :style="{ background: '#' + color }"></div>
			</div> -->
			<div class="save-area">
				<label>
					&nbsp;
					<button @click="download">Export as</button>
				</label>
				<FormatPicker label="&nbsp;" v-model="format" />
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
