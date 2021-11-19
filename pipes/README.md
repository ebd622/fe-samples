# Using Pipes to transform output

Pipses are a feature build in Angular2 which allows to transform output in a **template**.

There are pipes for different types of output and also for synch- and asynch data.
## Key points
* L240: [Using pipes](https://github.com/ebd622/fe-samples/blob/master/pipes/README.md#l240-using-pipes)
* L241: Parametrizing Pipes
* L244: Creating a custom pipe
* L246: [Creating a filter pipe](#l246-creating-a-filter-pipe)
* L247: [Pure and Impure pipes](#l247-pure-and-impure-pipes)
* L248: [Understanding `async` pipe](#l248-understanding-async-pipe)


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

   <ul class="list-group">
     <li
       class="list-group-item"
       *ngFor="let server of servers | filter:filteredStaus:'status'"
       [ngClass]="getStatusClasses(server)">
       ...
     </li>
   </ul>
  ...
</div>
```

#### L247: Pure and Impure pipes
Two points here:
* Changing the input of the pipe will trigger a recalculation - the pipe will be applied to the data agian.
* But **updating** arrays or objects doesn't trigger a reclculation.

This is a good behaviour, otherwise Angular will need to trigger a pipe with any data change on a page. It can be a performance issue.

You can use 'pure' to configure a pipe to force pipe recalculation:
```
@Pipe({
  name: 'filter',
  pure: false // Be careful with this prop, it can cause a performance issue! It means a pipe will be always recalculated when data is changed (see L248).
})
```

#### L248: Understanding `async` pipe

Let's imagine that we have a property `appStatus` which will be updated in 2 sec. 

To replicate this let's create a `Promise` (in [app.component.ts](https://github.com/ebd622/fesamples/blob/master/pipes/src/app/app.component.ts)). For example, data can be returned from HTTP call, from a server and so on.

```
  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    },2000);
    });
```
This will set `appStatus` to value `stable` but only after 2 sec.

Now we can output this in [app.component.html](https://github.com/ebd622/fe-samples/blob/master/pipes/src/app/app.component.html) with a pipe `async`:

```
<h2>AppStatus: {{appStatus | async}}</h2>
```
This will print out `stable` on a page after 2 sec.

What `async` does - it recognises that `appStatus` is a Promise (btw, it will also work with Observable). It would automatically subscribe and after 2 sec. 
it will recognise, that something is changed, that the Promise is resolved and it will print data.

## References
* More about pipes: https://angular.io/api?query=pipe
