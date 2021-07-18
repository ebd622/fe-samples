# Using Pipes to transform output

Pipses are a feature build in Angular2 which allows to transform output in a **template**.

There are pipes for different types of output and also for synch- and asynch data.
## Key points
* L240: Using pipes
* L241: Parametrizing Pipes
* L244: Creating a custom pipe
* L246: Creating a filter pipe


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

You can also use multiple parameters (if any) and **chain** (or combine) different pipes:

```
{{ server.started | date:'fullDate':'otherParam1':'otherParam2' | uppercase}}
```
An order in a **chain** is important, because it is evaluated from left to right

#### L244: Creating a custom pipe

You can create a custom pipe [shorten.pipe.ts](https://github.com/ebd622/fe-samples/blob/master/pipes/src/app/shorten.pipe.ts) and use it in a template:
```
<strong>{{ server.name | shorten:10 }}</strong>
```

#### L246: Creating a filter pipe

You can also create a [filter.pipe.ts](https://github.com/ebd622/fe-samples/blob/master/pipes/src/app/filter.pipe.ts) to filter an output. Then use the filter in a template [app.component.html](https://github.com/ebd622/fe-samples/blob/master/pipes/src/app/app.component.html):

```
<div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
  <input type="text" [(ngModel)]="filteredStaus">
  ...

</div>

```


## References
* More about pipes: https://angular.io/api?query=pipe
