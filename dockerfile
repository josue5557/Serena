# Usar una imagen ligera con Node.js
FROM node:18-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias primero
COPY package*.json ./

# Instalar dependencias de producción y desarrollo
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Construir la app de Next.js
RUN npm run build

# Exponer el puerto por el que corre Next.js
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]