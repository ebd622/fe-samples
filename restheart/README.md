# RESTHeart

RESTHeart is used as a back-end service in all examples.

## Quick start with RESTHeart
The easiest and quickest way is to deploy and run RestHeart with Docker

#### 1. Download yaml
```
$ mkdir restheart && cd restheart
$ curl https://raw.githubusercontent.com/SoftInstigate/restheart/master/docker-compose.yml --output docker-compose.yml
```

#### 2. Start services
```
$ docker-compose up -d
```

Use the following credentials to login:
```
username: admin
password: secret
```

#### 3. Usage

#### 3.1 Get all existing collections
```
curl -u admin:secret http://localhost:8080
```

## Resources

* How to run RESTHeart with Docker: https://restheart.org/docs/v3/docker/
* Git repo: https://github.com/SoftInstigate/restheart
* Video: https://www.youtube.com/watch?v=9KroH-RvjS0
* Try RESTHeart Online: https://restheart.org/docs/v6/try/
