# OpsMate – Containerizing and Deploying a Service Using Docker and AWS

## 📌 Project Overview

**OpsMate** is a containerized application deployment project created as part of the **IT Vedant Docker Fundamentals Mini Project**.

The main objective of this project is to understand how an application can be containerized using Docker and deployed using AWS container services.

The project covers Docker installation, Dockerfiles, Docker images, containers, Docker Compose, networking, Amazon ECR, Amazon ECS and AWS Fargate.

---

## 🎯 Project Objectives

* Understand Docker and containerization
* Install and configure Docker on an Ubuntu server
* Create a Dockerfile
* Build and manage Docker images
* Run and manage Docker containers
* Configure port mapping
* Use Docker Compose for multiple services
* Understand Docker networking and persistent volumes
* Push Docker images to Amazon ECR
* Deploy containers using Amazon ECS and AWS Fargate
* Monitor and troubleshoot Docker containers

---

## 🏗️ Project Architecture

```text
                    Developer
                        |
                        v
                   Dockerfile
                        |
                        v
                  Docker Image
                        |
                        v
                Docker Container
                        |
                        v
                  OpsMate App
                        |
                        v
                 Docker Compose
                   /        \
                  /          \
          App Container    Database
                  |
                  v
             Amazon ECR
                  |
                  v
             Amazon ECS
                  |
                  v
             AWS Fargate
                  |
                  v
          Running Application
```

---

## 🛠️ Technologies Used

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| Docker         | Containerization               |
| Dockerfile     | Building Docker image          |
| Docker Compose | Managing multiple containers   |
| Node.js        | Application runtime            |
| Ubuntu         | Server operating system        |
| AWS EC2        | Docker host                    |
| Amazon ECR     | Docker image registry          |
| Amazon ECS     | Container orchestration        |
| AWS Fargate    | Serverless container execution |
| Git & GitHub   | Version control                |

---

# 📂 Project Structure

```text
OpsMate-Docker-Project/
│
├── README.md
├── Dockerfile
├── compose.yml
├── .dockerignore
├── docker-deployment-report.txt
│
├── app/
│   ├── package.json
│   └── server.js
│
├── config/
│   └── environment.example
│
├── scripts/
│   ├── install-docker.sh
│   ├── build-image.sh
│   ├── run-container.sh
│   └── cleanup.sh
│
├── screenshots/
│   ├── docker-installation.png
│   ├── docker-daemon.png
│   ├── docker-image.png
│   ├── docker-container.png
│   ├── application-running.png
│   ├── docker-compose.png
│   ├── ecr-repository.png
│   ├── ecr-image.png
│   ├── ecs-cluster.png
│   ├── ecs-task.png
│   └── fargate-application.png
│
└── documentation/
    ├── Docker-Architecture.png
    └── Project_Report.pdf
```

---

# 🚀 Implementation Steps

## 1. Launch Ubuntu EC2 Instance

An Ubuntu EC2 instance was created on AWS to act as the Docker host.

After launching the instance, SSH was used to connect to the server.

```bash
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>
```

---

## 2. Update Ubuntu Packages

```bash
sudo apt update
sudo apt upgrade -y
```

This updates the available packages on the Ubuntu server.

---

## 3. Install Docker

Docker Engine was installed on the Ubuntu EC2 instance.

After installation, Docker was verified using:

```bash
docker --version
docker info
docker ps
```

The Docker service can be managed using:

```bash
sudo systemctl start docker
sudo systemctl stop docker
sudo systemctl restart docker
sudo systemctl enable docker
sudo systemctl status docker
```

---

# 🐳 4. Create the OpsMate Application

The application is located inside the `app` directory.

```text
app/
├── package.json
└── server.js
```

The application is built using Node.js.

---

# 📝 5. Create Dockerfile

The Dockerfile defines how the OpsMate Docker image is created.

Example:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY app/ .

EXPOSE 3000

CMD ["npm", "start"]
```

### Dockerfile Instructions

| Instruction | Purpose                             |
| ----------- | ----------------------------------- |
| `FROM`      | Selects the base image              |
| `WORKDIR`   | Sets the working directory          |
| `COPY`      | Copies application files            |
| `RUN`       | Executes commands while building    |
| `EXPOSE`    | Documents the application port      |
| `CMD`       | Defines the default startup command |

---

# 🏗️ 6. Build Docker Image

The Docker image was created using:

```bash
docker build -t opsmate:1.0 .
```

Verify the image:

```bash
docker images
```

---

# 📦 7. Run Docker Container

The container was started using:

```bash
docker run -d \
  --name opsmate-container \
  -p 3000:3000 \
  opsmate:1.0
```

Check the running container:

```bash
docker ps
```

The application can then be accessed using:

```text
http://<EC2-PUBLIC-IP>:3000
```

---

# 📋 8. Docker Container Management

### View containers

```bash
docker ps
docker ps -a
```

### View logs

```bash
docker logs opsmate-container
```

### Stop container

```bash
docker stop opsmate-container
```

### Start container

```bash
docker start opsmate-container
```

### Restart container

```bash
docker restart opsmate-container
```

### Remove container

```bash
docker rm opsmate-container
```

---

# 🔗 9. Docker Compose

Docker Compose was used to define and manage multiple services.

The Compose configuration contains the application and database services.

Start the services:

```bash
docker compose up -d
```

Check services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

Stop and remove the services:

```bash
docker compose down
```

Compose provides a simple way to manage multiple containers, networks and persistent volumes from one configuration file.

---

# ☁️ 10. Amazon ECR

**Amazon Elastic Container Registry (ECR)** was used to store the Docker image in AWS.

The general deployment flow is:

```text
Docker Image
     ↓
Tag Image
     ↓
Authenticate with ECR
     ↓
Push Image
     ↓
Amazon ECR Repository
```

Example commands:

```bash
docker tag opsmate:1.0 <AWS-ACCOUNT-ID>.dkr.ecr.<REGION>.amazonaws.com/opsmate:1.0
```

Authenticate Docker with ECR:

```bash
aws ecr get-login-password --region <REGION> | \
docker login --username AWS --password-stdin \
<AWS-ACCOUNT-ID>.dkr.ecr.<REGION>.amazonaws.com
```

Push the image:

```bash
docker push <AWS-ACCOUNT-ID>.dkr.ecr.<REGION>.amazonaws.com/opsmate:1.0
```

---

# 🚀 11. Amazon ECS and Fargate

The Docker image stored in ECR can be deployed using Amazon ECS and Fargate.

The deployment process is:

```text
Amazon ECR
    ↓
ECS Task Definition
    ↓
ECS Cluster
    ↓
ECS Service
    ↓
Fargate Task
    ↓
OpsMate Application
```

The ECS task definition contains configuration such as:

* Container image
* CPU
* Memory
* Port
* Environment variables
* Logging configuration

---

# 🔍 12. Monitoring and Troubleshooting

Useful Docker commands used during the project include:

```bash
docker ps
docker images
docker logs <container-name>
docker inspect <container-name>
docker stats
docker system df
```

For Docker Compose:

```bash
docker compose ps
docker compose logs
```

For AWS deployment, ECS task, service and application status should also be verified.

---

# 📸 Screenshots

The project includes screenshots showing:

* Docker installation
* Docker daemon
* Docker image
* Docker container
* Running application
* Docker Compose
* ECR repository
* ECR image
* ECS cluster
* ECS task
* Fargate application

---

# 🔐 Security Considerations

The following security practices should be followed:

* Do not upload `.pem` or private key files to GitHub.
* Do not commit passwords or API keys.
* Use environment variables for sensitive configuration.
* Use AWS IAM with appropriate permissions.
* Configure EC2 security groups carefully.
* Expose only the required ports.

Example `.gitignore`:

```gitignore
node_modules/
.env
*.pem
*.key
.DS_Store
```

---

# 🧹 AWS Cleanup

After project evaluation, AWS resources should be stopped or deleted when they are no longer required to avoid unnecessary AWS charges.

Resources to check include:

* EC2 instances
* ECS services
* ECS clusters
* Fargate tasks
* ECR repositories/images
* Load balancers
* Other associated AWS resources

---

# 📚 What I Learned

Through this project, I gained practical knowledge of:

1. Docker architecture
2. Docker Engine
3. Docker images
4. Docker containers
5. Dockerfiles
6. Port mapping
7. Container logs and inspection
8. Docker Compose
9. Docker networking
10. Persistent volumes
11. Amazon ECR
12. Amazon ECS
13. AWS Fargate
14. Container deployment and troubleshooting

---

# 🔄 Complete Project Flow

```text
Node.js Application
        ↓
     Dockerfile
        ↓
    Docker Build
        ↓
   Docker Image
        ↓
 Docker Container
        ↓
 Docker Compose
        ↓
      Testing
        ↓
     Amazon ECR
        ↓
      Amazon ECS
        ↓
     AWS Fargate
        ↓
 Running Application
```

---

## 👨‍💻 Project Information

**Project:** OpsMate – Containerizing and Deploying a Service Using Docker and AWS

**Program:** Executive Program in DevOps with AWS

**Institute:** IT Vedant

**Focus:** Docker, Containerization, AWS and DevOps

---

## ⭐ Conclusion

This project demonstrates the basic end-to-end workflow of containerizing an application using Docker and preparing it for deployment on AWS.

It helped build practical understanding of how Docker images and containers work and how containerized applications can be managed using Docker Compose and deployed using AWS ECR, ECS and Fargate.
