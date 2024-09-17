FROM node:20.11-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage

# Copy built assets from build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Add nginx configuration
RUN mkdir /etc/nginx/templates
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Set environment variable for Nginx configuration
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/etc/nginx/templates
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]