# Backend Setup & Troubleshooting Guide

## Error: "Invalid input" when adding products

### Root Cause
This error occurs when the frontend cannot connect to the backend API at `http://localhost:8080`.

---

## Solutions

### ✅ Solution 1: Use Mock Backend (Fastest - for Testing)

The project now includes a mock backend for development/testing.

**Enable mock backend:**
1. Open `.env.local` in the root directory
2. Change:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```
   To:
   ```env
   NEXT_PUBLIC_API_URL=/api/mock
   ```
3. Restart the dev server (Ctrl+C, then `npm run dev`)
4. Try adding a product - it should work with demo data!

---

### ✅ Solution 2: Run Real Backend (Production-Ready)

#### Prerequisites
- Java JDK 17+
- Maven 3.8+
- PostgreSQL 15+

#### Step 1: Database Setup
```bash
# Open PostgreSQL terminal and run:
CREATE DATABASE alpha_smartphone;

# Verify
\l
```

#### Step 2: Get Backend Source Code
The backend is a separate Java Spring Boot project. You need to:
1. Clone or get the backend repository
2. Place it in a separate folder (NOT inside this frontend folder)

#### Step 3: Configure Backend
In `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/alpha_smartphone
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update
```

#### Step 4: Start Backend
```bash
# In the backend project folder
mvn clean install
mvn spring-boot:run
```

You should see:
```
Started AlphaSmartPhoneApplication in X seconds
```

#### Step 5: Verify Backend
Open browser: `http://localhost:8080/api/phones`

You should see JSON data.

#### Step 6: Update Frontend
Make sure `.env.local` has:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Then restart frontend:
```bash
npm run dev
```

---

### ✅ Solution 3: Use API Proxy (Better Error Handling)

The project now includes an API proxy that provides helpful error messages.

**Enable proxy:**
1. In `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=/api/proxy
   ```
2. Restart dev server

The proxy will attempt to connect to the real backend but provide helpful error messages if it fails.

---

## Error Messages Guide

### "Backend server is not running"
**Solution:** Start the Java backend on port 8080

### "Cannot connect to backend at http://localhost:8080"
**Solution:** 
- Verify backend is running: `http://localhost:8080/api/phones`
- Check firewall settings
- Verify correct port (should be 8080)

### "Validation Error: Invalid input"
**Solution:** 
- Check form fields are filled correctly
- Verify image is uploaded
- Check backend logs for detailed validation errors

---

## Quick Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm dependencies installed (`npm install`)
- [ ] `.env.local` file exists in root
- [ ] Choose backend option:
  - [ ] Mock backend (fastest for testing)
  - [ ] Real backend (requires Java + PostgreSQL setup)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser opened to `http://localhost:3000`

---

## Development Server Running

Current status:
- ✅ Frontend: http://localhost:3000
- Backend: Choose one above

---

## Next Steps

1. **For Quick Testing:** Use Mock Backend (Solution 1)
2. **For Full Development:** Set up Real Backend (Solution 2)
3. **For Best Error Messages:** Use API Proxy (Solution 3)

Contact support if issues persist.
