# Use uma imagem base com Node.js
FROM node:lts

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY ./package*.json ./

# Instale as dependências
RUN yarn

# Copie o código-fonte do servidor
COPY ./ .

RUN yarn build

EXPOSE 4000

# Comando para iniciar o servidor
CMD ["node", "dist/index.js"]