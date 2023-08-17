FROM node:lts
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@10.2.0


COPY . /app

CMD ["ng","serve","--host", "0.0.0.0", "--disable-host-check"]