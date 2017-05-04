FROM  node:6

MAINTAINER kmsbbb@163.com


RUN ["mkdir", "-p", "/usr/src/app"]

COPY package.json /usr/src/app/

WORKDIR /usr/src/app

RUN ["npm", "install"]

ENV PORT 80

EXPOSE 80

RUN ["npm", "run", "build"]

ENTRYPOINT ["npm", "run", "start"]
