# Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-bullseye-slim

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 9000

# Define environment variable
ENV NODE_ENV=production

# DB Connection
ENV DB_DATABASE=
ENV DB_HOST=
ENV DB_USER=
ENV DB_PASSWORD=

ENV PORT=9000

ENV MAIL_SECURE=true

# Run the application
CMD ["npm", "start"]