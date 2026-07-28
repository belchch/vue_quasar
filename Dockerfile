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

# Настраиваем права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Переключаемся на пользователя nginx
USER nginx

# Открываем порт
EXPOSE 8080

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]