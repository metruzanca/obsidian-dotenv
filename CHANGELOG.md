# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---
## [0.1.1] - 2021-08-13
### Added 
- MIT License
- Meta: Added some better Release automation
### Changed
- Changed the docs to be a bit simpler and added a use case example

---
## [0.1.0] - 2021-08-13
### Added
- Variables are exposed at `app.env`
  - Variables without a group exposed directly e.g. `app.env[<variableName>]`
  - Grouped variables are exposed via `app.env[<groupName>][<variableName>]`
- Setting variables in `.obsidian/plugins/obsidian-dotenv/data.json` now show up aditable in dotenv's settings tab.