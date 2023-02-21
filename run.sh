#!/bin/bash

# Set up environment variables
export DB_HOST=localhost
export DB_PORT=3306
export DB_NOTES=notes
export DB_USER=root
export DB_PASSWORD=root

# Start the MySQL database
mysqld_safe &

# Wait for MySQL to start up
echo "Waiting for MySQL to start up..."
sleep 10

# Create the database and table
mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE $DB_NOTES"
mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE $DB_NOTES"
#mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD -D $DB_NAME -e "CREATE TABLE notes (id INT AUTO_INCREMENT, title VARCHAR(255), content TEXT, PRIMARY KEY (id))"

# Start the Spring Boot project
cd backend
./mvnw spring-boot:run &

# Start the React project
cd ../frontend
npm install
npm start &

# Register a signal handler to kill the background processes
trap 'kill $(jobs -p)' INT

# Wait for all child processes to exit
wait