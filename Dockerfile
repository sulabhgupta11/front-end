FROM node:8.12-alpine
RUN apk add g++ make python

#copy source 
COPY . /app

# Install deps 
RUN cd /app &&  npm install 

# Build 
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]