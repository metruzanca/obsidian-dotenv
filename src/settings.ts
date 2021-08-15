import { App, PluginSettingTab, Setting } from "obsidian";
import Dotenv from "./main";
import { EnvVar, UNNAMED_GROUP } from "./types";

export class SampleSettingTab extends PluginSettingTab {
	plugin: Dotenv;

	constructor(app: App, plugin: Dotenv) {
		super(app, plugin);
		this.plugin = plugin;
	}

	createSetting(containerEl: HTMLElement, key:string, envVar: EnvVar, group: string) {
		const s = new Setting(containerEl)
		s.setName(key)
		if (envVar.description) {
			s.setDesc(envVar.description)
		}
		s.addText(text => text
			.setPlaceholder('Enter your secret')
			.setValue(envVar.value)
			.onChange(async value => {
				await this.plugin.saveSettings(key, value, group);
			}));
		return s
	}

	coffe() {
		let {containerEl} = this;
		const div = containerEl.createDiv("coffee");
		div.createEl("a", {
				href: "https://www.buymeacoffee.com/samuelezanca"
		}).createEl("img", {
				attr: {
						src: "https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=valentine195&button_colour=e3e7ef&font_colour=262626&font_family=Inter&outline_colour=262626&coffee_colour=ff0000"
				}
		});
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();
		containerEl.createEl('h2', {text: 'Dotenv Settings'});
		
		const {unnamed, ...rest} = this.plugin.settings.env
		
		containerEl.createEl('h4', {text: 'Environment Variables'});
		for (let key in unnamed) {
			const envVar = unnamed[key]
			this.createSetting(containerEl, key, envVar, UNNAMED_GROUP)
		}

		for (let groupKey in rest) {
			const group = rest[groupKey]
			containerEl.createEl('h4', {text: `Group: ${groupKey}`});
			for (let key in group) {
				const envVar = group[key]
				this.createSetting(containerEl, key, envVar, groupKey)
			}
		}

		this.coffe()
	}
}