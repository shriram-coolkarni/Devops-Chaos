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
        sh 'docker build -t shriram232622/chaos-app:latest .'
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
        sh 'docker push shriram232622/chaos-app:latest'
    }
}

        stage('Deploy to App Server') {
    steps {
        sh '''
        ssh -i /var/jenkins_home/app-server.pem -o StrictHostKeyChecking=no ubuntu@16.170.244.137 << EOF
        docker pull shriram232622/chaos-app:latest
        docker stop chaos-container || true
        docker rm chaos-container || true
        docker run -d -p 3000:3000 --name chaos-container shriram232622/chaos-app:latest
        EOF
        '''
    }
}
    }
}
