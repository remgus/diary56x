# Diary56x

<div align="center">

Digital diary for schools made with Django & Vue.

<img alt="Python 3.9+" src="https://img.shields.io/badge/Python_Version-3.9+-blue.svg?style=flat-square">
<img alt="GNU GPLv3" src="https://img.shields.io/github/license/AlanTheKnight/diary56x?style=flat-square">

</div>

## Table of contents

- [Diary56x](#diary56x)
  - [Table of contents](#table-of-contents)
  - [About](#about)
  - [Development setup](#development-setup)
    - [Tools to install](#tools-to-install)
    - [Recommended VSCode plugins](#recommended-vscode-plugins)
    - [Dependencies](#dependencies)
    - [Server setup](#server-setup)
    - [Frontend VSCode settings](#frontend-vscode-settings)
    - [Backend VSCode settings](#backend-vscode-settings)

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

Backend's dependencies can be installed with Poetry from the root folder.

```bash
# Install python dependencies
poetry install
```

Frontend's dependencies can be installed with Yarn from ``diary56x/frontend`` folder.

```bash
cd diary56x/frontend

# Install NPM packages
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
cd diary56x

# Django server
poetry run python manage.py runserver
```

Open up a new terminal in the root folder.

```bash
cd diary56x/frontend

# Vue server
yarn serve
```

### Frontend VSCode settings

If you work on frontend, it's recommended to open ``diary56x/frontend`` folder in VSCode. _If you try yo work with Vue frontend from the root
folder of the project, Vetur extension doesn't work properly._

Recommended VSCode ``settings.json``:

```json
{
    "vetur.validation.interpolation": true,
    "vetur.experimental.templateInterpolationService": true
}
```

### Backend VSCode settings

Recommended VSCode ``settings.json``:

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
}
```
