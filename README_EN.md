<p align="right">
  🌐 <a href="README.md">Magyar veruó</a>
</p>

# Hair Salon – Appointment Booking & Administration System

**Language:** [HU Magyar](README.md) | GB English

## Screenshots

### Desktop View
| Home | Booking | Admin Login | Admin Dashboard |
|:---:|:---:|:---:|:---:|
| ![Home](public/assets/images/screenshots/main.png) | ![Booking](public/assets/images/screenshots/booking.png) | ![Login](public/assets/images/screenshots/login.png) | ![Dashboard](public/assets/images/screenshots/dashboard.png) |

### Mobile View
| Home | Booking | Admin Login | Admin Dashboard |
|:---:|:---:|:---:|:---:|
| ![Home](public/assets/images/screenshots/mobile-main.png) | ![Booking](public/assets/images/screenshots/mobile-booking.png) | ![Login](public/assets/images/screenshots/mobile-login.png) | ![Dashboard](public/assets/images/screenshots/mobile-dashboard.png) |

This project is a comprehensive website for a fictional hair salon, featuring a public appointment booking interface for clients and a protected administration panel for salon staff.

During development, I prioritized the **Mobile First** approach, secure authentication (**JWT**), and modular code architecture.

---

## Key Features

### Client Side
- **Responsive Landing Page:** Detailed information about the salon and its services.
- **Dynamic Price List:** Prices are loaded directly from the database.
- **Interactive Booking:** - Hairdresser selection.
    - **Real-time timeslot generation** (30-minute intervals).
    - **Automatic filtering of booked slots** (preventing double bookings).
    - **Client-side validation** using regular expressions.

### Admin Panel
- **Secure Login:** JWT (JSON Web Token) based authentication with HttpOnly cookies.
- **Dashboard:** An intuitive interface to manage appointments and hairdresser data.
- **CRUD Ready:** Organized, tabular data display via API endpoints.

## Tech Stack

### Backend
- **Node.js & Express:** Server-side logic and API service.
- **PostgreSQL:** Relational database for persistent data storage.
- **JWT (jsonwebtoken):** Token-based authentication.
- **Bcryptjs:** Secure password hashing.

### Frontend
- **EJS (Embedded JavaScript):** Dynamic HTML templating.
- **Vanilla JavaScript (ES6+ Modules):** Modular client-side logic.
- **CSS3 (Flexbox & Grid):** Fully responsive design with separate files for different breakpoints.

## Installation and Setup

1. **Clone the repo:**

```text
git clone [repo-url]
```

2. Install dependencies:

```text
npm install
```

3. Environment Variables:

Create a .env file based on the .env.example and fill in your details:

```text
DB_USER=your_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_super_secret_key
MY_API_KEY=your_api_key_for_backend_communication
```

4. Database Initialization:

- Create the database schema and load default test data by executing the hair_salon.sql file located in the project root.
- This step automatically creates the tables, services, hairdressers, and the default administrator account.

5. Starting the Application:

```text
node index.js  # Frontend server (port 3000)
node api.js    # API server (port 4000)
```

## Project Structure (Key Files)
- index.js: Main application and route handling.
- api.js: API endpoints for database operations.
- views/: EJS templates (header, footer, login, admin).
- public/assets/modules/: Reusable JS modules (validation, timeslot generation, API communication).
- public/assets/styles/: Responsive CSS architecture.

## Administrative Access (Testing)
For security reasons, this project does not contain hardcoded passwords in the source code. The system uses bcryptjs for password protection.

To log in for testing purposes:
1. Default User: A test account with the email admin@example.com is created during database initialization (hair_salon.sql).
2. Password: The password for testing is: admin123.
This password is added to the database in encrypted form by running the hair_salon.sql script. After logging in, the system starts a JWT-based session.
3. Session Management: Upon successful login, the system generates a JWT, which is stored in a HttpOnly cookie for secure browsing.

## Author
Developed by: Zita Lukács
Date: September 2025