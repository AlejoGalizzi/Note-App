# Use an official Node runtime as a parent image
FROM node:16.13.0 AS frontend

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application to the container
COPY frontend/ .

# Install Node.js dependencies
RUN npm install


# Build the React app
RUN npm run build

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk AS backend

# Set the working directory to /app
WORKDIR /app

COPY backend/ .

# Copy the JAR file to the container
RUN ./mvnw package -DskipTest

# Expose port 8080 for the Spring app
EXPOSE 8080

# Run the Spring app when the container starts
CMD ["java", "-jar", "app.jar"]
