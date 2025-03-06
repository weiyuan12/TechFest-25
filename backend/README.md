# Project Name

## Prerequisites

1. **Install Docker**

   Docker is required to build and run the application within containers. Follow the installation steps for your operating system:

    - **Windows**: [Install Docker Desktop on Windows](https://docs.docker.com/desktop/install/windows-install/)
    - **Mac**: [Install Docker Desktop on Mac](https://docs.docker.com/desktop/install/mac-install/)
    - **Linux**: Follow the instructions on [Docker's official Linux installation guide](https://docs.docker.com/engine/install/).

2. **Install Docker Compose**

   Docker Compose is used to define and run multi-container Docker applications. Docker Compose is included by default in Docker Desktop for both Windows and Mac. On Linux, you may need to install it separately.

    - Follow the instructions for Docker Compose installation [here](https://docs.docker.com/compose/install/).

---

## Setup

Once Docker and Docker Compose are installed, follow the steps below to run the application.

### 1. Clone the Repository

Clone the repository to your local machine (if you haven’t already):

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Build and Start the Application

To build and run the containers using Docker Compose, use the following command:

```bash
docker-compose -f ./docker-compose.yml up -d
```

### 3. Verify the Application

- Your Spring Boot application will be running on [http://localhost:8080](http://localhost:8080).
- MongoDB will be available on [localhost:27017](localhost:27017).

You can verify the application is working by checking the logs:

```bash
docker-compose logs backend-app-1
```
