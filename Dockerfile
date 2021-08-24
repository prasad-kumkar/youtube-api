FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . ./

ENV PORT 5000
EXPOSE ${PORT}
CMD [ "npm", "start" ]
