# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Устанавливаем только необходимые инструменты
RUN apk add --no-cache python3 make g++

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Quasar/Vite reads VITE_* at build time (see src/boot/axios.ts)
ARG VITE_API_URL=
ENV VITE_API_URL=${VITE_API_URL}
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env && npm run build

# Production stage
FROM nginx:stable-alpine

# Копируем собранное приложение
COPY --from=builder /app/dist/spa /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт (mapped to host :80 in docker-compose.prod.yml)
EXPOSE 8080

# Run as root in container so nginx can write /run/nginx.pid
CMD ["nginx", "-g", "daemon off;"]