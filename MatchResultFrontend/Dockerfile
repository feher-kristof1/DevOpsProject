FROM node:18-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
# use legacy-peer-deps to avoid peer dependency resolution failures in CI
RUN npm ci --legacy-peer-deps --silent
COPY . .
# pass flags to the script with `--` so they reach the underlying CLI
RUN npm run build -- --configuration production --verbose

FROM nginx:alpine
COPY --from=build /app/dist/MatchResultFrontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
