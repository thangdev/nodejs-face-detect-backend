FROM node:13-alpine

WORKDIR /usr/src/smart-brain-api
COPY ./ ./ 

# can have many RUN command
RUN npm install

# only 1 cmd command
CMD [ "npm", "start"]
