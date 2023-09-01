# Use uma imagem base com Node.js
FROM node:lts

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY ./package*.json ./

# Instale as dependências
RUN yarn

RUN npm install http-server -g

# Copie o código-fonte do cliente
COPY ./ .

RUN yarn build

EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["http-server", "./dist/"]