import { Plugin } from 'obsidian';
import { validateConfig } from './utils'
import { EnvGroup, Settings, UNNAMED_GROUP } from './types'
import { SampleSettingTab } from './settings';

const DEFAULT_SETTINGS: Settings = {
	env: {
		[UNNAMED_GROUP]: {
			// Vars without a name go here
		},
	}
}
export default class Dotenv extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));
		console.log('Dotenv Loaded')
	}

	dataError() {
		//@ts-ignore basePath does infact exist on DataAdapter
		const path = this.app.vault.adapter.basePath
		const dataPath = `${path}/.obsidian/plugins/obsidian-dotenv/data.json`
		console.error(
			`Theres an error in dotenv's data.json located at ${dataPath}`);
	}

	updateSingleVar(group:string, key:string, value:string) {
		//@ts-ignore
		window.app.env[group][key] = value
	}

	mapGroup(group: EnvGroup) {
		const groupMap: Record<string,string> = {}
		
		for (let key in group) {
			const envVar = group[key]
			groupMap[key] = envVar.value
		}

		return groupMap
	}

	updateEnvironmentVars() {
		const {unnamed, ...rest} = this.settings.env
		
		const env: Record<string,any> = {}
		for (let groupKey in rest) {
			const group = this.settings.env[groupKey]
			env[groupKey] = this.mapGroup(group)
		}

		//@ts-ignore we're adding env to window.app
		window.app.env = {
			...env,
			...this.mapGroup(unnamed)
		}
	}

	async loadSettings() {
		
		const settings = await this.loadData()
		console.log({settings});
		if(!validateConfig(settings)){
			this.dataError()
		}
		
		this.settings = {
			// ...DEFAULT_SETTINGS,
			...settings
		}

		console.log({loadedSettings: this.settings});

		this.updateEnvironmentVars()
	}

	async saveSettings(key: string, value: string, group: string = 'unnamed') {		
		this.settings.env[group][key].value = value
		await this.saveData(this.settings);
		this.updateSingleVar(group, key, value)
	}
}