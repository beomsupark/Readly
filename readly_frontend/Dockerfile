# First stage: build the frontend application
FROM node AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Second stage: serve the application with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

