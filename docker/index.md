# docker

> Docker 本身并不是容器，它是创建容器的工具，是应用容器引擎。想要搞懂 Docker，其实看它的两句口号就行。  
> “Build, Ship and Run”  
> “Build once，Run anywhere（搭建一次，到处能用）”。  
> Build（构建镜像）： 镜像就像是集装箱，包含文件以及运行环境等等资源；  
> Ship（运输镜像）：在宿主机和仓库间进行运输，这里仓库就像是超级码头；  
> Run（运行镜像）：运行的镜像就是一个容器，容器就是运行程序的地方。
> https://docker.com

dockfile 是用于创建 image 的。

## install

## command

### docker run

Explanation: This command is used to create and start a new Docker container based on a specified image.
Example: docker run -d --name my_container my_image (Runs a container named "my_container" from the "my_image" image in detached mode)
创建一个新的 container 去运行指定的 image.

```shell
docker run <imageName>:<tag>
docker run <imageName> # 默认tag是latest
``


### docker build:

Explanation: Builds a Docker image from a Dockerfile, which contains instructions for building the image.

Example: docker build -t my_image . (Builds an image named "my_image" from the Dockerfile in the current directory)

### docker pull:

Explanation: Downloads a Docker image from a Docker registry (e.g., Docker Hub) to the local machine.

Example: docker pull nginx (Downloads the latest version of the Nginx image)

### docker push:

Explanation: Pushes a Docker image from the local machine to a Docker registry.

Example: docker push my_registry/my_image (Pushes the "my_image" image to a Docker registry named "my_registry")

### docker ps:

Explanation: Lists all running Docker containers.
Example: docker ps (Lists all running containers along with their details)

### docker images:

Explanation: Lists all Docker images stored on the local machine.

Example: docker images (Lists all images along with their details)

### docker stop:

Explanation: Stops a running Docker container.
Example: docker stop my_container (Stops the container named "my_container")

### docker start:

Explanation: Starts a stopped Docker container.

Example: docker start my_container (Starts the container named "my_container")

### docker rm:

Explanation: Removes one or more Docker containers.
Example: docker rm my_container (Removes the container named "my_container")
```

docker run <name>
docker run <id>

````

### docker rmi:

Explanation: Removes one or more Docker images from the local machine.
Example: docker rmi my_image (Removes the image named "my_image")

## 创建一个image
```shell
docker run -it ubuntu bash
ls
apt-get update
apt-get install -y python3
apt-get install python3-pip
pip3 install flask
cat > /opt/app.py



ls
apt update
apt install -y nodejs
node -v
npm -v
apt install -y npm
node -v
npm -v
npm i express-generator -g
ls
express ./web
ls
cd web/
npm i
history


````

docker build . -t my_image_name:tag

## push

docker push my_image_name:tag
我尝试了，失败了。可能与 docker 源有关。

## 环境变量

docker run <iamge_name> -e MY_ENV_VAR=my_value

docker inspect blissful_hopper # 检查环境变量

## docker compose

docker-compose.yml

```yml
redis:
  image: redis
db:
  image: postgres:9.4
vote:
  image: voting-app
  ports:
    - 5000:80
  links:
    - redis
result:
  image: result-app
  ports:
    - 5001:80
  links:
    - db
worker:
  image: worker
  links:
    - db
    - redis
```

docker compose up

## docker engine
