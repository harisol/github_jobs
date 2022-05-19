FROM node:16
# workdir inside container
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run migrate && npm start