## Obsidian Dotenv

Useless on its own. This plugin was design to be used with other plugins such as templater and dataview.

Dotenv allows you to add variables to `app.env` e.g. `app.env.customVariable`.

This is useful if you want to distribute customizable templater tamplates without needing the user to dive into their code and instead easily customize them via dotenv.


## Usage

> Atm, theres no way to add variables via the settings (this will come as I learn the obsidian plugin api better) and must instead be done manually via the data.json file.

Variables present in data.json will be represented in the settings menu. Changing them here will update them in `app.env`

![](./assets/settings-example.png)

Variables without a group in `data.json` are saved under the `unnamed` group but don't have this group in `app.env`.

```json
{
  "badName": {
    "var 21": "value 21"
  },
  "var 11": "dwadwadwawadad"
}
```

An example of `data.json`
```json
{
  "env": {
    "unnamed": {
      "var 11": {
        "description": "description 11",
        "value": "dwadwadwawadad"
      }
    },
    "badName": {
      "var 21": {
        "description": "description 21",
        "value": "value 21"
      }
    }
  }
}
```

> Variables are nested under `env` in case this plugin ever gets more settings.

## TODO

- [ ] Add ability to add multiple vars to app.env
- [ ] Env groups.
  - [ ] Detele entire env groups
- [ ] Import button that allows people distributing templates to provide a `data.json` that contains their empty/default values and dotenv will handle merging the imported `data.json` with your `data.json`. (groups will be maintained in an import and duplicate names will be merged.)
  - [ ] Warn if merging a group and allow the user to rename either one of the groups.

## Development

Due to the folder structure, you cannot simply place this in your plugins folder and must instead symlink the `build` folder to `.obsidian/plugins/dotenv`