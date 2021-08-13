export const UNNAMED_GROUP = 'unnamed'

export interface EnvGroup {
	[key:string] : EnvVar;
}

export interface EnvVar {
	value: string;
	description: string;
}

export interface Settings {
	env: {
		[groupKey:string] : EnvGroup;
		[UNNAMED_GROUP]: EnvGroup;
	}
}

export type updateEnvVars = (
	(group: string, key: string, value: string) => void) | (() => void
)