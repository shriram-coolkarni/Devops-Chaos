pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/shriram-coolkarni/Devops-Chaos.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t chaos-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop chaos-container || true
                docker rm chaos-container || true
                docker run -d -p 3000:3000 --name chaos-container chaos-app
                '''
            }
        }

    }
}
