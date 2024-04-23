FROM ubuntu:latest

COPY ./ /app

USER root

RUN apt-get update && apt-get install curl -y \
    && apt-get install -y nodejs \
    && apt-get install -y npm \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && exec bash \
    && . ~/.bashrc \
    && nvm install v18.17.0 \
    && nvm use 18.17.0 \
    && npm install -g npm

WORKDIR /app

RUN npm i

CMD [ "npm", "run", "dev" ]
