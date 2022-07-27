# Diary56x frontend

## Table of contents

- [Diary56x frontend](#diary56x-frontend)
  - [Table of contents](#table-of-contents)
  - [Development setup](#development-setup)
    - [Tools to install](#tools-to-install)
    - [Recommended VSCode plugins](#recommended-vscode-plugins)
    - [Dependencies](#dependencies)
    - [Development server setup](#development-server-setup)
    - [VSCode configuration](#vscode-configuration)

## Development setup

### Tools to install

- [VSCode](https://code.visualstudio.com) (recommended editor)
- [Yarn](https://yarnpkg.com) (can be installed with _npm_)

### Recommended VSCode plugins

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Dependencies

```bash
yarn
```

### Development server setup

To start the development server, run:

```bash
# Vite development server
yarn dev
```

### VSCode configuration

Recommended VSCode `.vscode/settings.json`:

```json
{
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
  },
  "files.exclude": {
    "**/.git": true
  }
}
```
