import { ref, defineComponent } from "vue";
import domtoimage from 'dom-to-image';
import colorScheme from "color-scheme";
import Logo from "./components/logo.vue"
import ColorPicker from "./components/color-picker.vue";
import FormatPicker from "./components/format-picker.vue";
import ResolutionPicker from "./components/resolution-picker.vue";
import Presets from "./components/presets.vue";
import ThemeSwitch from "./components/theme-switch.vue";
import GitHubRepo from "./components/github-repo.vue";
import { refAutoReset, useClipboard } from "@vueuse/core";

export type Preset = {
	bgcolor: string
	body: string
	bodyLights: string
	primary: string
	secondary: string
}
export default defineComponent({
	components: {
		Logo,
		ColorPicker,
		FormatPicker,
		ResolutionPicker,
		Presets,
		ThemeSwitch,
		GitHubRepo
	},
	setup() {
		const { copy } = useClipboard()
		const copiedTooltip = refAutoReset<string | undefined>(undefined, 2500)
		const printArea = ref(null);
		const bgcolor = ref("transparent");
		const body = ref("#3e4442");
		const bodyLights = ref("#6b7375");
		const primary = ref("");
		const secondary = ref("");
		const format = ref<"PNG" | "SVG">("PNG");
		const width = ref(760);
		const height = ref(1000);
		const repoUrl = ref("https://github.com/Micene09/anubis-avatar-creator");

		function getPresetObject(): Preset {
			return {
				bgcolor: bgcolor.value,
				body: body.value,
				bodyLights: bodyLights.value,
				primary: primary.value,
				secondary: secondary.value
			}
		}
		async function download() {
			const style = { position: "static" };
			const dataUrl = format.value === "PNG"
				? await domtoimage.toPng(printArea.value, { width: width.value, height: height.value, style })
				: await domtoimage.toSvg(printArea.value, {} as any);
			const link = document.createElement('a');
			link.download = 'anubis-avatar.' + format.value.toLowerCase();
			link.href = dataUrl;
			link.click();
		}
		function share() {
			const preset = getPresetObject()
			const searchParams = new URLSearchParams(preset)
			const url = new URL(location.href.split("?")[0] + searchParams.toString())
			copy(url.toString())
			copiedTooltip.value = "Link copied"
		}
		function onPresetChanged(preset: Preset | null) {
			if (!preset) return;
			bgcolor.value = preset.bgcolor;
			body.value = preset.body;
			bodyLights.value = preset.bodyLights;
			primary.value = preset.primary;
			secondary.value = preset.secondary;
		}
		async function onClickImport() {
			const [handle] = await window.showOpenFilePicker({
					multiple: false,
					types: [{
						description: "Anubis Preset",
						accept: { 'application/*': ['.json'] }
					}]
			});
			if (handle.kind !== "file") return;
			const file = await handle.getFile();
			const reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function(){
				const content = reader.result as string;
				try {
					const preset: Preset = JSON.parse(content);
					bgcolor.value = preset.bgcolor;
					body.value = preset.body;
					bodyLights.value = preset.bodyLights;
					primary.value = preset.primary;
					secondary.value = preset.secondary;
				} catch {}
			}
		}
		function onClickExport() {
			const exportObj = getPresetObject()
			const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, undefined, "  "));
			const anchor = document.createElement('a');
			anchor.setAttribute("href", dataStr);
			anchor.setAttribute("download", "anubis-preset.json");
			document.body.appendChild(anchor);
			anchor.click();
			anchor.remove();
		}
		function onClickRandomColors() {
			const colors = new colorScheme()
				.from_hue(Math.random() * 1000)
				.scheme('contrast')
				.variation('light')
				.colors() as string[];
			primary.value = "#" + colors.at(0);
			secondary.value = "#" + colors.at(-1);
		}
		onClickRandomColors();
		return {
			onClickRandomColors,
			repoUrl,
			printArea,
			bgcolor,
			body,
			bodyLights,
			primary,
			secondary,
			format,
			width,
			height,
			share,
			copiedTooltip,
			download,
			onPresetChanged,
			onClickImport,
			onClickExport
		}
	}
})
