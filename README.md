# Diary56x

<div align="center">

Digital diary for schools made with Django & Vue.

<img alt="Python 3.9+" src="https://img.shields.io/badge/Python_Version-3.9+-blue.svg?style=flat-square">
<img alt="GNU GPLv3" src="https://img.shields.io/github/license/AlanTheKnight/diary56x?style=flat-square">

</div>

## Table of contents

- [Table of contents](#table-of-contents)
- [About](#about)
- [Development setup](#development-setup)
  - [Tools to install](#tools-to-install)
  - [Recommended VSCode plugins](#recommended-vscode-plugins)
  - [Dependencies](#dependencies)
  - [Server setup](#server-setup)
  - [VSCode configuration](#vscode-configuration)

## About

**Diary56x** is a new version of Diary56. While the original version uses Django both on backend and frontend, Diary56x uses Django only for backend and VueJS for frontend.

## Development setup

### Tools to install

- [Python](https://python.org/downloads/)
- [Poetry](https://python-poetry.org) (can be installed with _pip_)
- [VSCode](https://code.visualstudio.com) (recommended editor)
- [Yarn](https://yarnpkg.com) (can be installed with _npm_)

### Recommended VSCode plugins

- [Django](https://marketplace.visualstudio.com/items?itemName=batisteo.vscode-django)
- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### Dependencies

```bash
poetry install
yarn
```

### Server setup

On your first run, you will need to migrate changes to a development database and create a new root admin user with Django:

```bash
# Django migrations
poetry run python manage.py makemigrations
poetry run python manage.py migrate

# You'll be asked to provide some data
# like your email, name, etc.
# Use 0 for account_type.
poetry run python manage.py createsuperuser
```

Open up a new terminal in the root folder.

```bash
# Django development server
poetry run python manage.py runserver 0.0.0.0:8000
```

Open up a new terminal in the root folder.

```bash
# Vue development server
yarn serve
```

### VSCode configuration

Recommended VSCode ``.vscode/settings.json``:

```json
{
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true,
  },
  "files.exclude": {
    "**/.git": true,
    ".venv": true,
    "**/__pycache__": true,
    ".idea": true
  },
  "python.pythonPath": ".venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.lintOnSave": true,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black",
  "python.sortImports.args": ["-rc", "--atomic"],
  "[python]": {
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "files.associations": {
    "**/templates/*.html": "django-html"
  },
  "emmet.includeLanguages": {
    "django-html": "html"
  },
  "vetur.validation.template": true,
  "vetur.validation.script": true,
  "vetur.validation.style": true,
  "vetur.validation.interpolation": true,
  "vetur.experimental.templateInterpolationService": true,
}
```
