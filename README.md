# order-entry

A NestJS microservice for order entry, using Prisma ORM and PostgreSQL. Includes Docker and Docker Compose for local development.

## Features
- Modular NestJS structure
- Prisma ORM for database access
- PostgreSQL support
- Dockerized setup
- RESTful API endpoints
- Input validation and error handling

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Docker & Docker Compose

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/BaltaRomeroFolder/order-entry.git
   cd order-entry
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running with Docker Compose
1. Copy the example environment file and adjust as needed:
   ```sh
   cp .env.example .env
   ```
2. Start the services:
   ```sh
   docker-compose up --build
   ```
3. The API will be available at `http://localhost:3000/api`

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (used by Prisma and the app)
- Adjust other variables in `.env` as needed for your environment.

## Running Tests
To run the test suite:
```sh
npm run test
```

---

Feel free to customize this README further for your needs!
