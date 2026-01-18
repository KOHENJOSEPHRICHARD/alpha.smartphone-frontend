# Alpha.SmartPhone - Complete Setup Guide

This guide will help you run the Alpha.SmartPhone project with both **frontend (VS Code)** and **backend (IntelliJ IDEA)**.

## Prerequisites

### Required Software
- **Node.js** 18+ (for frontend)
- **Java JDK** 17+ (for backend)
- **Maven** 3.8+ (for backend build)
- **PostgreSQL** 15+ (database)
- **VS Code** (frontend development)
- **IntelliJ IDEA** (backend development)

## Part 1: Database Setup (PostgreSQL)

### Step 1: Install PostgreSQL
Download from: https://www.postgresql.org/download/

### Step 2: Create Database
Open pgAdmin or terminal and run:
```sql
-- Connect as postgres user
CREATE DATABASE alpha_smartphone;

-- Verify database exists
\l
```

### Step 3: Default Credentials
The application expects:
- **Host:** localhost
- **Port:** 5432
- **Database:** alpha_smartphone
- **Username:** postgres
- **Password:** postgres

To change credentials, edit `src/main/resources/application.properties`

## Part 2: Backend Setup (IntelliJ IDEA)

### Step 1: Open Project
1. Open IntelliJ IDEA
2. Go to **File** > **Open**
3. Select the project folder
4. Wait for IntelliJ to index the project

### Step 2: Install Lombok Plugin
1. Go to **File** > **Settings** > **Plugins**
2. Search for "Lombok"
3. Install and restart IntelliJ

### Step 3: Enable Annotation Processing
1. Go to **File** > **Settings** > **Build, Execution, Deployment** > **Compiler** > **Annotation Processors**
2. Check **Enable annotation processing**
3. Click **OK**

### Step 4: Configure JDK
1. Go to **File** > **Project Structure** > **Project**
2. Set **SDK** to Java 17 or higher
3. Set **Language level** to 17

### Step 5: Install Dependencies
1. Open the **Maven** panel (right sidebar)
2. Click the refresh icon to download dependencies
3. Or run in terminal: `mvn clean install`

### Step 6: Run the Application
1. Open `src/main/java/com/alphasmartphone/AlphaSmartPhoneApplication.java`
2. Click the green **Run** button next to `main()`
3. Wait for: `Started AlphaSmartPhoneApplication in X seconds`

### Step 7: Verify Backend
Open browser: http://localhost:8080/api/phones

You should see JSON array of phones.

## Part 3: Frontend Setup (VS Code)

### Step 1: Open Project
1. Open VS Code
2. Go to **File** > **Open Folder**
3. Select the project folder

### Step 2: Install Dependencies
Open terminal in VS Code and run:
```bash
npm install
```

### Step 3: Configure Environment
Create `.env.local` file in root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Step 4: Run Development Server
```bash
npm run dev
```

### Step 5: Open Application
Open browser: http://localhost:3000

## Part 4: Admin Access

### Default Admin Credentials
- **Username:** admin
- **Password:** Alpha@2025
- **Email:** alpha.smartphone.cz@gmail.com

### Access Admin Dashboard
1. Navigate to: http://localhost:3000/admin
2. Enter credentials
3. Click **Login to Dashboard**

## API Endpoints Reference

### Public Endpoints (No Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/phones | Get all phones |
| GET | /api/phones/{id} | Get phone by ID |
| GET | /api/phones/featured | Get featured phones |
| GET | /api/phones/search?keyword= | Search phones |
| POST | /api/inquiries | Submit inquiry |
| POST | /api/analytics/track | Track event |
| GET | /api/analytics/dashboard | Get analytics |

### Protected Endpoints (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Admin login |
| POST | /api/phones | Create phone |
| PUT | /api/phones/{id} | Update phone |
| DELETE | /api/phones/{id} | Delete phone |
| GET | /api/inquiries | Get all inquiries |
| PUT | /api/inquiries/{id}/status | Update inquiry status |
| DELETE | /api/inquiries/{id} | Delete inquiry |
| GET | /api/audit-logs/recent | Get recent logs |

## Troubleshooting

### Backend Issues

#### Error: "Connection refused" to PostgreSQL
**Solution:**
1. Verify PostgreSQL is running
2. Check database name, username, password in `application.properties`
3. Ensure database `alpha_smartphone` exists

#### Error: "JWT signature does not match"
**Solution:**
- The JWT secret must be at least 32 characters (256 bits)
- Default secret in `application.properties` is sufficient

#### Error: "Port 8080 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8080
kill -9 <PID>
```

### Frontend Issues

#### Error: "Failed to fetch"
**Solution:**
1. Ensure backend is running on http://localhost:8080
2. Check `.env.local` has correct API URL
3. Verify CORS is configured in backend

#### Error: "Module not found"
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Database Issues

#### Error: "Database does not exist"
**Solution:**
```sql
CREATE DATABASE alpha_smartphone;
```

#### Error: "Authentication failed"
**Solution:**
Update `application.properties` with correct PostgreSQL credentials

## Project Structure

```
alpha-smartphone/
├── app/                          # Next.js pages
│   ├── admin/                    # Admin dashboard
│   ├── phones/                   # Phone listings
│   ├── about/                    # About page
│   └── contact/                  # Contact page
├── components/                   # React components
├── lib/                          # Utilities
│   ├── api-client.ts            # API client
│   └── translations.ts          # i18n translations
├── src/main/java/                # Spring Boot backend
│   └── com/alphasmartphone/
│       ├── config/              # Configuration
│       ├── controller/          # REST controllers
│       ├── service/             # Business logic
│       ├── repository/          # Data access
│       ├── model/               # JPA entities
│       ├── dto/                 # Data transfer objects
│       ├── security/            # JWT & auth
│       └── exception/           # Error handling
├── src/main/resources/
│   └── application.properties   # App configuration
├── pom.xml                      # Maven dependencies
└── package.json                 # npm dependencies
```

## Running Both Frontend and Backend

### Terminal 1 (Backend)
```bash
cd /path/to/project
mvn spring-boot:run
```

### Terminal 2 (Frontend)
```bash
cd /path/to/project
npm run dev
```

### Or in IDEs
1. Run backend in IntelliJ IDEA
2. Run frontend in VS Code terminal

## Production Deployment

### Backend
```bash
mvn clean package
java -jar target/alpha-smartphone-backend-1.0.0.jar
```

### Frontend
```bash
npm run build
npm start
```

## Support

- **Email:** alpha.smartphone.cz@gmail.com
- **WhatsApp:** +255 629 707 898

---

**Alpha.SmartPhone** - Professional Smartphone Retail Platform
