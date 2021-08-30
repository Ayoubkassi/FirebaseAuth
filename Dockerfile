FROM node:alpine 

WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
CMD ["npm","start"]


#FROM nginx:latest

#COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

#COPY --from=build /app/build /user/share/nginx/html


