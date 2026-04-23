FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/MatchResultFrontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
