pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/SGU-MAMF-10C.git'
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        sh './mvnw clean package'
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    dir('client') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Docker Compose Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Docker Compose Up') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
