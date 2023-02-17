# Use an official Node runtime as a parent image
FROM node:16.13.0 AS frontend

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the React app
RUN npm run build

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk AS backend

# Set the working directory to /app
WORKDIR /app

# Copy the JAR file to the container
COPY target/*.jar app.jar

# Expose port 8080 for the Spring app
EXPOSE 8080

# Run the Spring app when the container starts
CMD ["java", "-jar", "app.jar"]
