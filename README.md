## Obsidian Dotenv

Useless on its own. This plugin was design to be used with other plugins such as templater and dataview.

Dotenv allows you to add variables to `app.env` e.g. `app.env.customVariable`.

This is useful if you want to distribute customizable templater tamplates without needing the user to dive into their code and instead easily customize them via dotenv.

TODO:
- [ ] Add ability to add multiple vars to app.env
- [ ] Env groups.
  - [ ] Detele entire env groups
- [ ] Import button that allows people distributing templates to provide a `data.json` that contains their empty/default values and dotenv will handle merging the imported `data.json` with your `data.json`. (groups will be maintained in an import and duplicate names will be merged.)
  - [ ] Warn if merging a group and allow the user to rename either one of the groups.

## Development

Due to the folder structure, you cannot simply place this in your plugins folder and must instead symlink the `build` folder to `.obsidian/plugins/dotenv`