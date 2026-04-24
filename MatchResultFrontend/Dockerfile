FROM node:22-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
# use legacy-peer-deps to avoid peer dependency resolution failures in CI
RUN npm ci --legacy-peer-deps --silent
COPY . .

# build the Angular app into a known output folder
RUN npm run build -- --configuration production --output-path=dist/matchresultfrontend --verbose \
	&& echo "Dist contents:" \
	&& find /app/dist -maxdepth 4 -type f | sort \
	&& test -d /app/dist/matchresultfrontend/browser

FROM nginx:alpine
COPY --from=build /app/dist/matchresultfrontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
