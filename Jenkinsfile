pipeline {
    agent any

    environment {
        IMAGE_NAME = "chaos-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/shriram-coolkarni/Devops-Chaos.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop chaos-container || true
                docker rm chaos-container || true
                docker run -d -p 3000:3000 --name chaos-container $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Cleanup Old Images') {
            steps {
                sh '''
                docker images $IMAGE_NAME --format "{{.ID}}" | tail -n +3 | xargs -r docker rmi
                '''
            }
        }

    }
}
