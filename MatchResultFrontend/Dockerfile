# Multi-stage build for Angular static app
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production --output-path=dist

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /tmp/dist
RUN rm -rf /usr/share/nginx/html/* \
	&& if [ -d /tmp/dist/browser ]; then \
		cp -r /tmp/dist/browser/. /usr/share/nginx/html/; \
	   else \
		cp -r /tmp/dist/*/browser/. /usr/share/nginx/html/; \
	   fi

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
