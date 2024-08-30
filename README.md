Raspberry Pi Deployment: [rental-management-system](https://matteopassalent.com)
## System Architecture

The three top-level components of the software system include the Frontend React Application, the Flask API, and the Database Models and Schema. Described below is a list of the features each top-level component enables.

**Frontend React Application:**  
The react web application runs in the user’s browser and enables the following features:

1. Interface for adding and removing cars from inventory: Enables users to interact with the application and add/remove cars from their dealership's inventory.  
2. Material Design User Interface: The React application provides a simple UI based on Material Design patterns. It displays all cars and their current status for the user.   
3. Interface for updating car status: Provides users with an interface to update the status of their cars when a car is rented out or undergoing maintenance.   
4. Interface for adding customers and assigning cars to renters: Provides users with an interface to add new customers and assign cars to new or existing customers.  
     
   

**Flask API:**  
The RESTful Flask API runs on the server and creates an interface for accessing and modifying persistent storage. Below are some of the specific features:

1. Perform add/remove operations for cars: Process input data from the user and create a car object that can be stored as persistent data. Receives user request to remove a car and removes target car from the database.   
2. Maintain and retrieve Car and Customer data: Retrieve cars and customers from persistent storage, process the data, and return it.  
3. Maintain and update status category of cars: Receives input from the user to change the status of a car, assigns a customer to the car if rented, and updates the new status in persistent storage. 

**Database Schema:**  
The table models and embedded SQL database enable the following features:

1. Store persistent data: Stores non-volatile car and customer data that can be accessed and modified by the user over multiple sessions.   
2. Establish class models for data storage: Initializes Car and Customer class models that contain attributes of each class and define their one-to-many relationship.

## Solution Features

Component diagram of the three major components and their sub-components:  
![image1](https://github.com/MatteoPassalent/rental-management-system/blob/dev/report_images/diagram_1.png)

**Frontend React App:**

- App Layout Module: The layout module consists of three JSX components in the layout directory. It is responsible for the base UI layout of the application, including the header bar and the three status boxes.  
- Status Categories Module: The status categories module consists of three JSX components in the status\_catergories directory. It is responsible for initializing the data to be displayed in each category and setting the proper car list and status for each box.   
- Cars Module: The cars module consists of two JSX components in the car's directory. It is responsible for the UI that displays the cars. It determines the items contained in the list of cars and represents each car's data as a card in the list.

**Flask API:**

- Customers Module: The Customers module consists of two routes in the Customer Flask-blueprint. These routes allow the web application to retrieve a persistent list of customers and add new customers to the list.   
- Status Update Module: The status update module consists of four routes in the Status\_update Flask-blueprint. These routes allow the web application to change the status of an existing car and assign a car to a customer.   
- Cars Module: The cars module consists of three routes in the Cars Flask blueprint. These routes allow the web application to retrieve a persistent list of cars as well as add and remove cars from the list. 

**Database Schema:**

- Car Model: The car model is a class that defines the car data type and initializes a table to store car data. It defines all the car attributes and generates a unique ID for each car. It also defines a one-to-many relationship with the customer class by storing a foreign key from the customer to the car that is rented.  
- Customer Model: The customer model is a class that defines the customer data type and initializes a table to store customers. It defines the customer attributes, generates a unique ID, and completes the one-to-many relationship by maintaining a list of cars the customer is currently renting. 

## Use Cases:
![image2](https://github.com/MatteoPassalent/rental-management-system/blob/dev/report_images/diagram_2.png)

**Use Cases:**

* **Rent Car**  
  * A customer requests to rent a car from the dealership employee.  
* **Return Car**  
  * A customer returns the car to the dealership and notifies the dealership employee.  
* **Add Car to Inventory**  
  * A dealership employee adds a newly acquired car to the inventory. This includes entering all the car details into the system.   
* **Remove Car from Inventory**  
  * A dealership employee removes a car from the system inventory.  
* **Update Car Status**  
  * A dealership employee updates the status of a car, this includes marking it as rented, under maintenance, or available in the inventory.   
* **Take Car for Maintenance**  
  * The mechanic requests for the dealership employee to remove a car from the inventory to undergo maintenance.  
* **Return Car from Maintenance**  
  * The mechanic returns a car from maintenance and notifies the dealership employee.

## Class Diagram

![image3](https://github.com/MatteoPassalent/rental-management-system/blob/dev/report_images/diagram_3.png)

**Customer Class:**  
The Customer class represents new and current customers who rent cars from the dealership. The Customer class demonstrates informational cohesion. It implements two functions that both have their own entry/exit points and both perform operations on the same data structure. This ensures reusability and reduces maintenance costs if this class needs to be updated.

**Car Class:**  
The Car class represents a car currently owned by the dealership. The Car class demonstrates functional cohesion. It performs exactly one operation on one data type. The Car class is essential to the system and is utilized across various components. Functional cohesion ensures it is kept as simple as possible, enhancing its reliability throughout the application.

## Sequence Diagram

![image4](https://github.com/MatteoPassalent/rental-management-system/blob/dev/report_images/diagram_4.png)

**Dealership Employee \<--\> Rental Car Management System**

This sequence diagram illustrates the interaction between a dealership employee and the rental car management system. The employee interacts with the system through various operations:

1. **Display Inventory (Async):**  
   * When the dealership employee accesses the system web application, the page is populated with a list of cars in each category.  
2. **Add a New Car (Synchronous):**  
   * The employee provides input information for a new car to be added to the system’s permanent storage.  
3. **Update a Car’s Status (Synchronous):**  
   * The employee uses the UI to update the category status of an existing car.   
4. **Remove a Car (Synchronous):**  
   * The employee selects a car to be removed from the system.  
5. **Add New Customer (Synchronous):**  
   * The employee inputs details of a new customer. The system adds the customer to permanent storage.   
6. **Display Updated Inventory (Async):**  
   * After each add, remove, or modify operation performed on the dealership’s inventory the new information will be displayed for the employee to view in the UI.

## Deployment
The application was deployed on a Raspberry Pi web server. Gunicorn was used to manage the background Python processes, and Nginx was configured as a reverse proxy to serve the web app securely over HTTP/HTTPS, directing external traffic to the Raspberry Pi while handling SSL termination. An SSH agent was configured to ensure secure remote access and enable CI/CD workflows that automatically build, test, and deploy code changes to the Raspberry Pi’s production environment. A custom dynamic DNS service was developed to handle changes in the network's public IP address. This service automatically detects IP changes and updates the domain accordingly, simulating the functionality of a static IP, which ISPs typically preserve for enterprise networks.

<img src="https://github.com/MatteoPassalent/rental-management-system/blob/dev/report_images/image_1.jpg" alt="image1" width="600"/>


