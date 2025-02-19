# Etapa 1: Build (criar a aplicação)
FROM node:18 AS build

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json (ou yarn.lock) para a imagem
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código fonte para a imagem
COPY . .

# Compilar o projeto TypeScript para JavaScript
RUN npm run build

# Etapa 2: Produção (rodar a aplicação)
FROM node:18 AS production

# Definindo o diretório de trabalho novamente
WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários da etapa de build (a pasta 'dist' com os arquivos compilados)
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist

# Instalar as dependências de produção
RUN npm install --only=production

# Expor a porta onde o aplicativo irá rodar
EXPOSE 3000

# Comando para rodar o aplicativo
CMD ["node", "dist/main"]
