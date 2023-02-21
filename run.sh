#!/bin/bash

# Set up environment variables
export REACT_APP_BACKEND_URL=http://localhost:8080
export FRONTEND_URL=http://localhost:3000
export DB_HOST=localhost
export DB_PORT=3306
export DB_NOTES=notes
export DB_USER=root
export DB_PASSWORD=root
export SPRING_DATASOURCE_URL=jdbc:mysql://$DB_HOST:$DB_PORT/$DB_NOTES
export SPRING_DATASOURCE_USERNAME=$DB_USER
export SPRING_DATASOURCE_PASSWORD=$DB_PASSWORD

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

# Remove environment variables
unset REACT_APP_BACKEND_URL
unset FRONTEND_URL
unset DB_HOST
unset DB_PORT
unset DB_NOTES
unset DB_USER
unset DB_PASSWORD
unset SPRING_DATASOURCE_URL
unset SPRING_DATASOURCE_USERNAME
unset SPRING_DATASOURCE_PASSWORD

# Wait for all child processes to exit
wait