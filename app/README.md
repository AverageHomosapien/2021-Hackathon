# 2021-Hackathon
Our 2021 hackathon project	Our 2021 hackathon project

## How to run Api:


Step 1:

-   [Download Docker](https://download.docker.com/win/beta/InstallDocker.msi)
-   Run the installer
-   Follow the install wizard: Accept and shiz
-   Finish and wait for docker launch
-   Should boot up immediately


Step 2:

```
docker run hello-world
```

For verification docker works. 


Step  3:

Time to finally run the Api

```
docker build -t docker-flask:latest .
```

```
docker run --name flask-api -v$PWD/app:/app -p5000:5000 docker-flask:latest
```

After you run this once it's saved to your local container registry: If you stop it, just use

```
docker run flask-api
```