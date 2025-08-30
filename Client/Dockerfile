FROM node:18-alpine
WORKDIR /app

ARG BACKEND_BASE_URL
ENV BACKEND_BASE_URL=${BACKEND_BASE_URL}

COPY . .
RUN npm install
RUN npm run build

CMD tail -f /dev/null
