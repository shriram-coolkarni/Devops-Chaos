pipeline {
    agent any

    environment {
    DOCKER_IMAGE = "shriram232622/chaos-app:latest"
    APP_SERVER = "ubuntu@16.170.244.137"
}

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/shriram-coolkarni/Devops-Chaos.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Login to DockerHub') {
            steps {
             withCredentials([usernamePassword(
    credentialsId: 'dockerhub-creds',
    usernameVariable: 'DOCKER_USER',
    passwordVariable: 'DOCKER_PASS'
)]) {

    sh '''
    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
    '''
}
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy to App Server') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no $APP_SERVER << EOF
                docker pull $DOCKER_IMAGE
                docker stop chaos-container || true
                docker rm chaos-container || true
                docker run -d -p 3000:3000 --name chaos-container $DOCKER_IMAGE
                EOF
                '''
            }
        }
    }
}
