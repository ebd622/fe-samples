# Using Pipes to transform output

Pipses are a feature build in Angular2 which allows to transform output in a **template**.

There are pipes for different types of output and also for synch- and asynch data.
## Key points
* L240: Using pipes
* L241: Parametrizing Pipes
* L242: 


#### L240: Using pipes

In [app.component.html](https://github.com/ebd622/fe-samples/blob/master/pipes/src/app/app.component.html) you can see two build-in pipes: `uppercase` and `date`:

```
...
<strong>{{ server.name }}</strong> |
{{ server.instanceType | uppercase}} |
{{ server.started | date:'fullDate' | uppercase}}
...
```
#### L241: Parametrizing Pipes
It is possible to perametrize pipes, for example, use a parameter `fullDate`:

```
{{ server.started | date:'fullDate'}}
```

You can also use multiple parameters (if any) and compbine different pipes:

```
{{ server.started | date:'fullDate':'otherParam1':'otherParam2' | uppercase}}
```

## References
* More about pipes: https://angular.io/api?query=pipe
