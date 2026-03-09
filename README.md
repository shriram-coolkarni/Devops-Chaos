# DevOps Chaos Engineering CI/CD Pipeline

## Overview

This project demonstrates an end-to-end DevOps workflow including CI/CD
automation, containerized deployment, chaos testing, and infrastructure
monitoring using AWS.

The goal of this project was to understand how real DevOps systems work
together in practice --- from code commit to deployment and monitoring.

The application includes a **Chaos Dashboard** that intentionally
stresses the server so system behavior can be observed through
monitoring tools.

------------------------------------------------------------------------

## Architecture

Developer pushes code → GitHub → Jenkins CI/CD → Docker Build →
DockerHub → Application Server → Node Exporter → Prometheus → Grafana

------------------------------------------------------------------------

## Infrastructure Setup

### 1. Jenkins Server (CI/CD)

Runs Jenkins inside Docker and handles the CI/CD pipeline.

Pipeline steps: - Pull latest code from GitHub - Build Docker image -
Push image to DockerHub - Connect to application server using SSH -
Deploy the container

------------------------------------------------------------------------

### 2. Application Server

Runs the application container.

The frontend includes a **Chaos Engineering dashboard** with four
actions:

-   Crash the application
-   Slow down the application
-   Generate high CPU usage
-   Generate high memory usage

These actions allow observing system behaviour under stress.

Node Exporter runs on this server to expose system metrics.

------------------------------------------------------------------------

### 3. Monitoring Server

The monitoring stack consists of:

-   Prometheus -- collects metrics
-   Grafana -- visualizes metrics in dashboards

Prometheus scrapes metrics from Node Exporter and Grafana displays
system performance.

------------------------------------------------------------------------

## Chaos Engineering Dashboard

The application contains a simple testing dashboard designed to simulate
real infrastructure issues.

  Action             Effect
  ------------------ -----------------------------
  Crash App          Simulates application crash
  Slow App           Introduces response delay
  High CPU Load      Generates CPU stress
  High Memory Load   Consumes large memory

------------------------------------------------------------------------

## Monitoring Flow

Node Exporter → Prometheus → Grafana

Metrics collected include: - CPU usage - Memory consumption - Disk
usage - System load - Network activity

------------------------------------------------------------------------

## CI/CD Pipeline

GitHub Push → Jenkins Pipeline → Docker Image Build → Push to DockerHub
→ Deploy Container to App Server

------------------------------------------------------------------------

## Challenges Faced

-   Jenkins crashing due to low memory → solved by configuring **swap
    memory**
-   Disk space issues due to Docker images → cleaned unused Docker
    resources
-   Jenkins unable to run Docker commands → connected Jenkins container
    to Docker engine
-   DockerHub authentication failure → solved using DockerHub access
    token
-   Prometheus scraping failure → opened **port 9100** for Node Exporter
-   Node Exporter stopping after logout → created **systemd service**

------------------------------------------------------------------------

## Technologies Used

-   AWS EC2
-   Jenkins
-   Docker
-   DockerHub
-   Prometheus
-   Grafana
-   Node Exporter
-   GitHub
-   Linux

------------------------------------------------------------------------
------------------------------------------------------------------------

## What This Project Demonstrates

-   CI/CD automation
-   Containerized deployment
-   Multi-server DevOps architecture
-   Infrastructure monitoring
-   Chaos engineering testing
-   Real-world debugging experience

------------------------------------------------------------------------

## Future Improvements

-   Prometheus Alertmanager for alerts
-   Kubernetes deployment
-   Infrastructure as Code with Terraform
-   Auto-scaling infrastructure

------------------------------------------------------------------------

## Author

Shriram Kulkarni
