import { EnvGroup, Settings } from './types'

export function validateGroup(group: EnvGroup) {
	for(let key in group) {
		const envVar = group[key]
		if (!('value' in envVar)) {
			return false
		}
	}
	return true
}

export function validateConfig(settings: Settings) {
	// Catch is for typescript injecting its own methods to ensure type safety
	// Infact, this code might not be necessary and we might just have to loop the object
	try {
		// "env" key exists
		if('env' in settings) {
			// check that groups that have children, those children match the pattern
			for(let groupKey in settings.env) {
				const isValid = validateGroup(settings.env[groupKey])				
				if (!isValid) return false
			}
		}
		return true
	} catch (error) {
		return false
	}
}