# Food Delivery — Payment Microservice

A standalone **payment microservice** for a food delivery platform, built with **Node.js/Express** and **MongoDB**, paired with a **React** frontend for the checkout and payment flow. Designed to run independently and be composed with other microservices via **Docker Compose** or **Kubernetes**.

## ✨ Features

- **Payment initialization** — start a payment for an order with an amount, currency, and payment method
- **Multiple payment methods** — supports **Stripe**, **PayHere** (a South Asian payment gateway), and **Cash on Delivery**
- **Payment confirmation** — confirm a payment once the provider has processed it
- **Payment lookup** — fetch a payment by its ID or by the associated order ID
- **Webhooks** — dedicated webhook endpoints to receive asynchronous payment status updates from providers
- **JWT-based authentication** — payment routes are protected via a bearer-token middleware
- **Payment history UI** — React frontend with checkout, payment method selection (credit card / PayHere / PayPal forms), and payment history pages
- **Structured logging** via Winston
- Container-ready: **Dockerfiles** for both services, a **docker-compose.yml** for local multi-container setup, and **Kubernetes manifests** for cluster deployment

## 🛠 Tech Stack

**payment-service (backend)**
- Node.js + Express 5
- MongoDB with Mongoose
- Stripe SDK, custom PayHere integration
- JSON Web Tokens (`jsonwebtoken`) for auth
- bcryptjs, dotenv, cors, winston (logging)

**payment-frontend**
- React 19 + Vite
- Ant Design (`antd`) component library
- React Router DOM
- Axios

**Infrastructure**
- Docker (per-service Dockerfiles + Nginx for serving the frontend)
- Docker Compose (local orchestration: MongoDB + payment-service + payment-frontend)
- Kubernetes manifests (namespace, configmap, secrets, deployments, ingress)

## 📂 Project Structure

```
food-delivery-microservices-payment-service/
├── docker-compose.yml               # Local multi-container orchestration
├── k8s/                              # Kubernetes manifests
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   ├── mongodb-deployment.yaml
│   ├── payment-service-deployment.yaml
│   ├── payment-frontend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── ingress.yaml
├── payment-service/
│   ├── server.js                     # Express app entry point
│   ├── config/                       # DB connection, environment config
│   ├── controllers/
│   │   └── paymentController.js      # initialize / confirm / fetch / webhook handlers
│   ├── models/
│   │   └── Payment.js                # Payment schema
│   ├── routes/
│   │   └── paymentRoutes.js          # /api/payments/* routes
│   ├── services/
│   │   ├── stripeService.js          # Stripe integration
│   │   └── payHereService.js         # PayHere integration
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT auth guard
│   └── utils/
│       └── logger.js                 # Winston logger setup
└── payment-frontend/
    └── src/
        ├── components/payment/
        │   ├── PaymentMethod.jsx     # Payment method selector
        │   ├── CreditCardForm.jsx    # Stripe card form
        │   ├── PayHereForm.jsx       # PayHere form
        │   ├── PayPalForm.jsx        # PayPal form
        │   └── PaymentSummary.jsx    # Order/payment summary
        ├── pages/
        │   ├── CheckoutPage.jsx
        │   ├── PaymentConfirmationPage.jsx
        │   └── PaymentHistoryPage.jsx
        └── services/
            └── paymentService.js     # API calls to the payment-service backend
```

## 🗄 Data Model

**Payment**

| Field | Type | Notes |
|---|---|---|
| `orderId` | `String` | Associated order |
| `amount` | `Number` | Payment amount |
| `currency` | `String` | Defaults to `LKR` |
| `paymentMethod` | `String` | One of `stripe`, `paypal`, `payhere` |
| `status` | `String` | `pending` → `completed` / `failed` |
| `paymentDetails` | `Object` | Provider-specific response payload |
| `createdAt` | `Date` | Auto-set on creation |

## 🔌 API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/payments/initialize` | Start a new payment (auth required) |
| `PUT` | `/api/payments/confirm/:paymentId` | Confirm a payment (auth required) |
| `GET` | `/api/payments/:paymentId` | Get a payment by ID (auth required) |
| `GET` | `/api/payments/order/:orderId` | Get all payments for an order (auth required) |
| `GET` | `/api/payments/payhere/return` | PayHere success redirect handler |
| `GET` | `/api/payments/payhere/cancel` | PayHere cancel redirect handler |
| `POST` | `/api/payments/webhook/:provider` | Provider-specific webhook handler |
| `POST` | `/api/payments/webhook` | Generic webhook receiver |

## 🚀 Getting Started

### Option A: Docker Compose (recommended)

```bash
git clone https://github.com/ruwanyahettiarachchi/food-delivery-microservices-payment-service.git
cd food-delivery-microservices-payment-service
docker compose up --build
```

This spins up MongoDB, the payment API (port `3001`), and the frontend (port `3000`, served via Nginx).

> ⚠️ The `docker-compose.yml` ships with placeholder secrets (`JWT_SECRET`, `STRIPE_SECRET_KEY`, `PAYHERE_MERCHANT_ID`, `PAYHERE_SECRET`). Replace these with your own values — ideally sourced from a `.env` file or Docker/Kubernetes secrets — before using real payment providers.

### Option B: Run services individually

**Backend**
```bash
cd payment-service
npm install
# Create a .env file with: PORT, MONGODB_URI, JWT_SECRET, STRIPE_SECRET_KEY, PAYHERE_MERCHANT_ID, PAYHERE_SECRET
npm start
```

**Frontend**
```bash
cd payment-frontend
npm install
npm run dev
```

### Kubernetes deployment

Manifests under `k8s/` define a dedicated namespace, config map, secrets, and deployments/services for MongoDB, the payment API, and the frontend, plus an ingress for routing. Apply them with:

```bash
kubectl apply -f k8s/
```

(Update `k8s/secrets.yaml` with your own base64-encoded secret values first.)

## 🧠 Key Concepts to Learn From This Project

This is a great project to build on if you want to go deeper into **microservices architecture**:

- Designing a **single-responsibility service** (payments only) that other services (orders, users) would call over HTTP
- Supporting **multiple payment provider integrations** behind one unified API surface
- Handling **asynchronous payment confirmation** via webhooks vs. synchronous confirmation calls
- Securing internal APIs with **JWT middleware**
- **Containerizing** a multi-service app with Docker Compose for local development
- Translating that same architecture into **Kubernetes manifests** (Deployments, Services, ConfigMaps, Secrets, Ingress) for production-style orchestration
- Structuring an Express backend into clear **routes → controllers → services → models** layers

## 📄 License

This project is available for personal and educational use. Feel free to fork and adapt it for your own learning purposes.
