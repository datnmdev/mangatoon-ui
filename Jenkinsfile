pipeline {
    agent any

    environment {
        REMOTE_SERVER_HOST = '192.168.64.5'
        REMOTE_SERVER_USERNAME = 'root'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Thực hiện clone dự án từ github về workspace khi một sự kiện xảy ra (push event)
                git 'https://github.com/datptithcm/mangatoon-ui-deployment.git'
            }
        }

        stage('Prepare Remote Directory and Transfer Workspace') {
            steps {
                // Sử dụng sshagent với thông tin xác thực 'ssh-remote'
                sshagent(['ssh-remote']) {
                    // Xóa các file và thư mục con trong thư mục đích từ xa
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'rm -rf /root/mangatoon-ui/*'"
                    
                    // Sau khi dọn dẹp, chuyển các file từ workspace đến server từ xa
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'remote-server-2', 
                                transfers: [
                                    sshTransfer(
                                        cleanRemote: false, 
                                        excludes: '', 
                                        execCommand: '', 
                                        execTimeout: 120000, 
                                        flatten: false, 
                                        makeEmptyDirs: false, 
                                        noDefaultExcludes: false, 
                                        patternSeparator: '[, ]+', 
                                        remoteDirectory: '', 
                                        remoteDirectorySDF: false, 
                                        removePrefix: '', 
                                        sourceFiles: '**'
                                    )
                                ], 
                                usePromotionTimestamp: false, 
                                useWorkspaceInPromotion: false, 
                                verbose: false
                            )
                        ]
                    )
                }
            }
        }

        stage ('Deployment') {
            steps {
                sshagent(['ssh-remote']) {
                    // Ngưng lại và xoá tất cả các container đã chạy trước đó
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST} '
                    cd /root/mangatoon-ui
                    if docker compose -f compose.yaml ps -q | grep -q .; then
                        docker compose -f compose.yaml down
                    else
                        echo "No containers running from compose.yaml"
                    fi'
                    """

                    // Xoá các images đã được build trước đó
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_SERVER_USERNAME}@${REMOTE_SERVER_HOST} '
                    IMAGES=\$(docker images -q "mangatoon-ui-*")
                    if [ -n "\$IMAGES" ]; then
                        docker rmi -f \$IMAGES
                    else
                        echo "No images to remove."
                    fi'
                    """

                    // Chạy file cấu hình compose.yaml để tiến hành build và chạy các container như đã cấu hình
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_SERVER_USERNAME@$REMOTE_SERVER_HOST 'docker compose -f mangatoon-ui/compose.yaml up -d --build'"
                }
            }
        } 
    }
}
