# Etapa de construcción
FROM node:20-alpine as build

# Directorio de trabajo
WORKDIR /app

# Primero copiamos los archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY angular.json ./


# Instalamos dependencias
RUN npm install

# DESPUÉS de instalar dependencias, copiamos el resto del código
COPY . .

# Construir la aplicación en modo producción
RUN npm run build -- --configuration=production

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/www /usr/share/nginx/html

# Exponer el puerto
EXPOSE 4300

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 