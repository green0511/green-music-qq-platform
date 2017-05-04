FROM  node:6

MAINTAINER kmsbbb@163.com

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

ENTRYPOINT ["npm", "run", "start"]
