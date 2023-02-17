# Welcome to my Note Manager

This a webpage to manage a list of notes. With them you can do the following things: 
- Create a note.
- Edit a note.
- Delete a note.

Also you have categories to associate with the notes and you can create more categories.


## Tools used in this app

This app require either front and back end tools. It was developed with Java 17 and Spring Boot 3.0.2. But here is the list of tool that were used and you should have in order to run this project:
- Java: 17
- Spring-Boot: 3.0.2
- ReactJs: 18.2.0
- NodeJs: 16.13.0
- Maven: 2
- MySQL: 8.0
Other tools I've that are not essential for run the project are Material-UI for the front end components. In the backend I use JWT and Spring Boot Security for the log in implementation. There are some test made also were I use Junit to do integration test (Mostly good scenarios).

### Run the project
To run the project you need to step in the main folder, and execute the run.sh. In this script there are some assumptions for the database. You need to enter and change the DB_USER and DB_PASSWORD if they are different in your MySQL server. This is the similar case for the application.properties that is located in the backend\src\main\resources folder, the MySQL credentials in both files need to be the same as it is in your server.

## Guidance in the web app
When you enter the web app you will see the log in page, where you need to enter your username and password. If you don't have the credentials you could click the sign up button and create one, and then you could log in with that credentials. But in any case, here you have some initial credentials like demos: 
- Luitgard: myPassword
- Christel: myPassword123
- Stefanie: myPassword653
- Oswald: myPassword6123

Once you enter you could see the list of your active notes, add new ones, archive them, delete them, etc. 
Hope you enjoy it!
