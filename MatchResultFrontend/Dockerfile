FROM node:18-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
# use legacy-peer-deps to avoid peer dependency resolution failures in CI
RUN npm ci --legacy-peer-deps --silent
COPY . .

# build the Angular app into a known output folder
RUN npm run build -- --configuration production --output-path=./MatchResultFrontend --verbose \
	&& echo "Dist contents:" \
	&& ls -la /app || true

FROM nginx:alpine
COPY --from=build /app/MatchResultFrontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
