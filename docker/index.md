# docker

> Docker 本身并不是容器，它是创建容器的工具，是应用容器引擎。想要搞懂 Docker，其实看它的两句口号就行。  
> “Build, Ship and Run”  
> “Build once，Run anywhere（搭建一次，到处能用）”。  
> Build（构建镜像）： 镜像就像是集装箱，包含文件以及运行环境等等资源；  
> Ship（运输镜像）：在宿主机和仓库间进行运输，这里仓库就像是超级码头；  
> Run（运行镜像）：运行的镜像就是一个容器，容器就是运行程序的地方。

dockfile 是用于创建 image 的。

## command

docker run:

Explanation: This command is used to create and start a new Docker container based on a specified image.

Example: docker run -d --name my_container my_image (Runs a container named "my_container" from the "my_image" image in detached mode)

2. docker build:

Explanation: Builds a Docker image from a Dockerfile, which contains instructions for building the image.

Example: docker build -t my_image . (Builds an image named "my_image" from the Dockerfile in the current directory)

3. docker pull:

Explanation: Downloads a Docker image from a Docker registry (e.g., Docker Hub) to the local machine.

Example: docker pull nginx (Downloads the latest version of the Nginx image)

4. docker push:

Explanation: Pushes a Docker image from the local machine to a Docker registry.

Example: docker push my_registry/my_image (Pushes the "my_image" image to a Docker registry named "my_registry")

5. docker ps:

Explanation: Lists all running Docker containers.

Example: docker ps (Lists all running containers along with their details)

6. docker images:

Explanation: Lists all Docker images stored on the local machine.

Example: docker images (Lists all images along with their details)

7. docker stop:

Explanation: Stops a running Docker container.

Example: docker stop my_container (Stops the container named "my_container")

8. docker start:

Explanation: Starts a stopped Docker container.

Example: docker start my_container (Starts the container named "my_container")

9. docker rm:

Explanation: Removes one or more Docker containers.

Example: docker rm my_container (Removes the container named "my_container")

10. docker rmi:

Explanation: Removes one or more Docker images from the local machine.

Example: docker rmi my_image (Removes the image named "my_image")
