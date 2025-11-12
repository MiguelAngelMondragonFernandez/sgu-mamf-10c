pipeline {
    agent any

    environment {
        PATH="/usr/bin:${env.PATH}"
    }

    stages {
        //Primera etapa, para todos los servicios
        stage('Parando los servicios'){
            steps {
                sh ''' 
                docker compose -p sgu-mamf-10c down || true
                '''
            }
        }
        //Eliminar las imagenes antiguas
        stage('Eliminando imagenes antiguas'){
            steps {
                sh ''' 
                IMAGES=$(docker images --filter "label=docker.compose.project=sgu-mamf-10c" -q)
                if [ -n "$IMAGES" ]; then
                    docker images rmi -f $IMAGES
                else
                    echo "No hay imagenes para eliminar"
                fi
                '''
            }
        }
        //Bajar la actualizacion
        stage('Actualizando...'){
            steps {
                checkout scm
            }
        }
        //Levantar y desplegar el proyecto
        stage('Construyendo y desplegando...'){
            steps {
                sh ''' 
                docker compose up --build -d
                '''
        }
        }
    }

    post {
        success {
            echo 'Despliegue completado con exito!'
        }
        failure {
            echo 'El despliegue ha fallado.'
        }

        always {
            echo 'Proceso de despliegue finalizado.'
        }
    }
}