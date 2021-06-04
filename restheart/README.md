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

##### 3.1 Get all existing collections
```
curl -u admin:secret http://localhost:8080
```

##### 3.x Create a new collection
```
curl -i -u "admin:secret" -H "Content-Type:application/json" -X PUT http://localhost:8080/new_collection
```

##### 3.1 Get all documents from a particular collection
```
curl -u admin:secret http://localhost:8080/collection1
```

##### 3.x Get ETag fro a particular collection (returned via headers)
```
curl -i -u admin:secret http://localhost:8080/collection1
```
```
X-Powered-By: restheart.org
Auth-Token-Location: /tokens/admin
Access-Control-Expose-Headers: Location, ETag, X-Powered-By, Auth-Token, Auth-Token-Valid-Until, Auth-Token-Location
Date: Fri, 04 Jun 2021 08:32:13 GMT
Auth-Token: 686158tl6p2cjkvs4kvx2wl28dvcsjscp4adjreizmpord3llx
Connection: keep-alive
Access-Control-Allow-Origin: *
ETag: 60b9e08c7a0a3e29a426b110
Auth-Token-Valid-Until: 2021-06-04T08:47:13.924265100Z
Access-Control-Allow-Credentials: true
Content-Type: application/json
Content-Length: 125
```
Here `ETag` is an ID of a collection. It used when you need to delete the whole collection

##### 3.2 Create a new document in a collection
```
curl -i -u "admin:secret" -H "Content-Type:application/json" -X POST -d '{"title":"test","content":"content"}' http://localhost:8080/collection1
```
##### 3.3 Delete a document from a collection
TODO

##### 3.4 Delete all documents from a collection
TODO

##### 3.5 Delete a collection
```
curl -i -u "admin:secret" -H "Content-Type:application/json" -H "if-Match:<ETag>" -X DELETE http://localhost:8080/collection2
```


#### 4. Stop services
```
$ docker-compose stop
```

## Resources

* How to run RESTHeart with Docker: https://restheart.org/docs/v3/docker/
* Git repo: https://github.com/SoftInstigate/restheart
* Video: https://www.youtube.com/watch?v=9KroH-RvjS0
* Try RESTHeart Online: https://restheart.org/docs/v6/try/
