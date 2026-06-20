FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# --host flag is critical for Vite to accept connections from outside the container
CMD ["npm", "run", "dev", "--", "--host"]