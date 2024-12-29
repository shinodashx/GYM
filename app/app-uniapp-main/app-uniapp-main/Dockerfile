FROM node:19-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN npm run build

RUN npm install -g serve

EXPOSE 8080
# serve -p 8080 -s /usr/src/app/dist/build/h5
CMD ["serve", "-p", "8080", "-s", "/usr/src/app/dist/build/h5"]
