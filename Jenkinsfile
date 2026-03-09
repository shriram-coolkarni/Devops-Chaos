pipeline {
    agent any

    environment {
        APP_SERVER="ubuntu@16.170.244.137"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/shriram-coolkarni/Devops-Chaos.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t chaos-app:latest .'
            }
        }

        stage('Deploy to App Server') {
    steps {
        sh '''
        ssh -o StrictHostKeyChecking=no ubuntu@16.170.244.137 << EOF
        docker stop chaos-container || true
        docker rm chaos-container || true
        docker run -d -p 3000:3000 --name chaos-container chaos-app:latest
        EOF
        '''
    }
  }

    }
}
