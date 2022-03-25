# Development setup

## Tools to install

- [Python](https://python.org/downloads/)
- [Poetry](https://python-poetry.org) (can be installed with _pip_)
- [VSCode](https://code.visualstudio.com) (recommended)
- [Yarn](https://yarnpkg.com)

## Recommended VSCode plugins

- [Django](https://marketplace.visualstudio.com/items?itemName=batisteo.vscode-django)
- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Dependencies

```bash
poetry install
yarn
```

## Server setup

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
yarn dev
```

## Recommended VSCode config

Recommended VSCode ``.vscode/settings.json``:

```json
{
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
