# Payzy Test Backend

This is the backend service for Payzy, a fintech company. It is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. This readme provides instructions on how to set up and run the backend service.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Environment Variables](#1-environment-variables)
  - [2. Development Server](#2-development-server)
  - [3. Docker Build](#3-docker-build)
  - [4. Docker Run](#4-docker-run)

## Prerequisites
Before setting up the backend service, ensure you have the following dependencies installed:
- Node.js (version 12 or above)
- Docker (optional, for running the service in a containerized environment)

## Getting Started
Follow the instructions below to set up and run the Payzy Test Backend service.

### 1. Environment Variables
1. Rename the `.env.sample` file in the project root directory to `.env`.
2. Update the `.env` file with the following information:
   - `PRIVATEKEY_ACCESSTOKEN`: Private key used for access token generation.
   - `ACCESSTOKENTTL`: Access token time-to-live in seconds.
   - `DB_HOST`: Hostname or IP address of the database server.
   - `DB_PORT`: Port number on which the database server is running.
   - `DB_USERNAME`: Username for accessing the database.
   - `DB_PASSWORD`: Password for accessing the database.
   - `DB_NAME`: Name of the database.

### 2. Development Server
1. Open a terminal and navigate to the project directory.
2. Run the following command to install the required dependencies:
   ```
   npm install
   ```
3. Start the development server by running the command:
   ```
   npm run start:dev
   ```
   The backend service will be up and running on `http://localhost:3001` by default.

### 3. Docker Build
1. Ensure you have Docker installed and running on your system.
2. Open a terminal and navigate to the project directory.
3. Run the following command to build the Docker image:
   ```
   docker build -t payzy-test-backend .
   ```
   This will build a Docker image named `payzy-test-backend` using the provided Dockerfile.

### 4. Docker Run
1. After successfully building the Docker image, you can run the backend service inside a Docker container.
2. Use the following command to start a container:
   ```
   docker run --name payzy-test-backend-container -p 3001:3001 -d payzy-test-backend
   ```
   This command creates a Docker container named `payzy-test-backend-container` from the `payzy-test-backend` image and maps port 3000 of the container to port 3000 of the host machine.

Congratulations! You have successfully set up and run the Payzy Test Backend service. Feel free to integrate it with the frontend application, which is developed using Next.js, and test the complete system.

For any questions or issues, please contact Thruka Ruwna at tharukaruwan@outlook.com.