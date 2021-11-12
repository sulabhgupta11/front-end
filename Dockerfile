FROM 911075010171.dkr.ecr.us-east-1.amazonaws.com/node:8.12-alpine
RUN apk add g++ make python

#copy source 
COPY . /app

# Install deps and build
RUN cd /app &&  npm install && npm run build


ENTRYPOINT [ "npm", "run", "start" ]