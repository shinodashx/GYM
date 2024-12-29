FROM node:slim

RUN npm config set registry https://registry.npm.taobao.org
ENV WORKDIR /app

RUN mkdir -p $WORKDIR

RUN npm install -g serve 

WORKDIR $WORKDIR
ADD build $WORKDIR/build


CMD ["serve", "-s", "build"]
