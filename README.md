# Product Listing App

This is a web application built with Node.js, Express, React, and MySQL. \
In order to run the app, you will need to have Docker installed on your machine.

## Set Up

1. Clone the repository to your local machine by running the following command in your terminal: `git clone https://github.com/lohwenyu/product-listing-app.git`. 
2. Navigate to the project directory in your terminal: `cd product-listing-app`. 
3. Run the following command to start the Docker container: `docker-compose -f docker-compose.yml up --build -d`.
4. Once the containers are up and running, you can access the app by opening your web browser and navigating to [http://localhost:3000] (http://localhost:3000). This will take you to the app's homepage, where you can create an account or log in with the test account. 
5. To stop the containers, run the following command in your terminal: `docker-compose down`.

## Testing

A test account has been provided to use when testing the app:

* Email: test_account@gmail.com
* Password: test_account123

Alternatively, register an account to test the app.