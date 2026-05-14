# Employee Management System (EMS)

A simple Full-Stack CRUD application built using Java (Spring Boot) for the backend API and Angular 21 for a clean, responsive user interface. It features employee creation, live data tables with search, sort, and pagination, and inline salary updates.

---

## 🛠️ Tech Stack & Versions
- **Frontend:** Angular 21.2.12 (Standalone Architecture)
- **Backend:** Spring Boot 3.x (Java)
- **Database:** MySql
- **Node.js runtime:** 24.15.0

---

## 🚀 How to Run the Project?

### 1. Start the Backend Server (Spring Boot)
1. Open your backend project folder in a terminal.
2. Run the following command to start the server:
   ```bash
   mvn clean spring-boot:run
   ```
3. The backend server will run securely at: **http://localhost:8080**

### 2. Start the Frontend Application (Angular)
1. Open your frontend folder `employee-mgmt-ui` in a terminal.
2. Install all required dependencies first:
   ```bash
   npm install
   ```
3. Boot up the local development server:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to the live interface: **http://localhost:4200**

---

## 📌 Core API Endpoints (Base URL: http://localhost:8080)

1. **Create Employee:** `POST /employees`  
   *Validations: Name cannot be blank, Email must be unique, Salary must be > 0.*
2. **Get All Employees:** `GET /employees?page=0&size=5&sort=name,asc`  
   *Features built-in pagination, search, and table header sorting.*
3. **Update Salary:** `PUT /employees/{id}/salary`  
   *Updates specific employee compensation structures.*

---

## ⭐ Application Highlights
- **SaaS Dashboard Design:** Clean user interface layout utilizing modern cards, custom department badges, and smooth row hover colors.
- **Custom Toast Popups:** Reusable notification banner system flashing real-time "Success" or "Error" statuses on the top-right corner without blocking user interactions.
