FROM node:22-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps --silent
COPY . .

RUN npm run build -- --configuration production --output-path=dist/matchresultfrontend --verbose \
	&& echo "Dist contents:" \
	&& find /app/dist -maxdepth 4 -type f | sort \
	&& test -d /app/dist/matchresultfrontend

FROM nginx:alpine
COPY --from=build /app/dist/matchresultfrontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
