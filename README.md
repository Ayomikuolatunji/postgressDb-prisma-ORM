# Project Documentation

## Project requirements

To run this project you must have all these available in your local machine

###  Postgres pgAdmin4 GUI or any other postgres UI installed

To install and configure postgres follow this guide(`https://linuxhint.com/install-pgadmin4-ubuntu/`)

## Get Started

### 1, Connect your docker postgres server using to the GUI by providing the env variables

### Run this docker command to build the container and image,

```
docker-compose up -d
docker ps 
```

The output of this command will be similar to this:

```
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS        PORTS                                       NAMES
7621fce68710   postgres:13   "docker-entrypoint.s…"   13 hours ago   Up 13 hours   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   problem1-postgres-1
```

### Start server on docker

```
docker-compose up
```