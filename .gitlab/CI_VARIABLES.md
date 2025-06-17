# CI/CD Variables

Список переменных, определенных в настройках CI/CD проекта (Settings -> CI/CD -> Variables).

YC = Yandex Cloud.

## All Environments

| Variable | Description | Protected | Masked |
|----------|-------------|-----------|--------|
| CI_YC_REGISTRY | Адрес реестра контейнеров | No | No |
| NPM_CONFIG_CACHE | Путь к кешу NPM пакетов | No | No |

## Development Environment

| Variable | Description | Protected | Masked |
|----------|-------------|-----------|--------|
| DEV_YC_SERVICE_ACCOUNT_KEY | Ключ доступа к Облаку | No | Yes |
| DEV_YC_FOLDER_ID | ID Каталога | No | No |
| DEV_YC_CONTAINER_ID | ID Контейнера | No | No |
| DEV_YC_REGISTRY_ID | ID Реестра Контейнеров | No | No |
| DEV_YC_REGISTRY_REPO_NAME | Имя Репозитория в Реестре Контейнеров | No | No |
| DEV_YC_SERVICE_ACCOUNT_ID | ID Сервисного Аккаунта Каталога | No | No |
| DEV_YC_NETWORK_ID | ID Сети | No | No |
| DEV_API_URL | URL Backend API для dev окружения | No | No |

## Staging Environment

| Variable | Description | Protected | Masked |
|----------|-------------|-----------|--------|
| STAGE_YC_SERVICE_ACCOUNT_KEY | Ключ доступа к Облаку | Yes | Yes |
| STAGE_YC_FOLDER_ID | ID Каталога | Yes | No |
| STAGE_YC_CONTAINER_ID | ID Контейнера | Yes | No |
| STAGE_YC_REGISTRY_ID | ID Реестра Контейнеров | Yes | No |
| STAGE_YC_REGISTRY_REPO_NAME | Имя Репозитория в Реестре Контейнеров | Yes | No |
| STAGE_YC_SERVICE_ACCOUNT_ID | ID Сервисного Аккаунта Каталога | Yes | No |
| STAGE_YC_NETWORK_ID | ID Сети | Yes | No |
| STAGE_API_URL | URL Backend API для stage окружения | Yes | No |

## Production Environment

| Variable | Description | Protected | Masked |
|----------|-------------|-----------|--------|
| PROD_YC_SERVICE_ACCOUNT_KEY | Ключ доступа к Облаку | Yes | Yes |
| PROD_YC_FOLDER_ID | ID Каталога | Yes | No |
| PROD_YC_CONTAINER_ID | ID Контейнера | Yes | No |
| PROD_YC_REGISTRY_ID | ID Реестра Контейнеров | Yes | No |
| PROD_YC_REGISTRY_REPO_NAME | Имя Репозитория в Реестре Контейнеров | Yes | No |
| PROD_YC_SERVICE_ACCOUNT_ID | ID Сервисного Аккаунта Каталога | Yes | No |
| PROD_YC_NETWORK_ID | ID Сети | Yes | No |
| PROD_API_URL | URL Backend API для production окружения | Yes | No |

## Важные замечания

1. Protected variables могут использоваться только в protected branches и tags
2. Masked variables скрыты в логах CI/CD
3. Environment scope определяет доступность переменной в конкретном окружении
4. Переменные YC_SERVICE_ACCOUNT_KEY замаскированы, скрыты и хранятся в закодированном виде (base64)
5. API_URL для каждого окружения должен соответствовать соответствующему окружению backend

## Использование в CI/CD

```yaml
# Пример использования переменных в пайплайне
build:
  script:
    # Сборка с правильным API URL
    - export VUE_APP_API_URL=${DEV_API_URL}
    - npm run build

# Пример использования при деплое
deploy:
  script:
    - |
      yc serverless container revision deploy \
        --container-id $DEV_YC_CONTAINER_ID \
        --environment VUE_APP_API_URL=$DEV_API_URL
```

## Связанные файлы

- `../.gitlab-ci.yml`
- `.gitlab/dev.gitlab-ci.yml`
- `.gitlab/stage.gitlab-ci.yml`
- `.gitlab/prod.gitlab-ci.yml`
- `vue.config.js`