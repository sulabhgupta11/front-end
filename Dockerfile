FROM 911075010171.dkr.ecr.us-east-1.amazonaws.com/node:8.12-alpine
RUN apk add g++ make python
WORKDIR /app
COPY package.json .
RUN npm install && npm run build
COPY . .
ENTRYPOINT [ "npm", "run", "start" ]