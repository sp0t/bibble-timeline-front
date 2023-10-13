FROM node
RUN apt update && \
    apt install npm -y 
WORKDIR /admin
RUN npm install mysql node-mysql -g && \
    npm install -g n && \
    n 16.14 stable
COPY admin/. /admin
WORKDIR /admin
RUN npm install npm node-mysql --save
RUN yarn install && \
    yarn build
EXPOSE 80
CMD ["yarn", "run", "start"]