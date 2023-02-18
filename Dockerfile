# Choose a base image with JDK 17 and Node.js 17
FROM openjdk:17-jdk AS build

FROM node:17 AS nodebuild

# # Install Node.js
# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -fsSL https://deb.nodesource.com/setup_17.x | bash - && \
#     apt-get install -y nodejs

# Install MySQL and create the notes schema
RUN su apt-get update && \
    su apt-get -y upgrade && \
    su apt-get install -y mysql-server && \
    rm -rf /var/lib/apt/lists/*

RUN service mysql start && \
    mysql -u root -proot -e "CREATE DATABASE notes;"

# Copy the Spring Boot project
COPY backend /backend

# Copy the React project
COPY frontend /frontend

# Build the React project
WORKDIR /frontend
RUN npm install && \
    npm run build

# Package the Spring Boot project
WORKDIR /backend
RUN ./mvnw package

# Start the Spring Boot project
CMD ["java", "-jar", "/backend/target/backend.jar"]