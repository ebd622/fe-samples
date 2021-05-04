# Observables

This is an example on how to use Observabels

## Key Points
* Observable and Observer
* Operators
* Subjects

## Observable and Observer

**Observable** is a data source (for instance, button click, http-request and so on). It emits data. </br>
**Observer** it is a subscribe function, it is your code which will be executed at a particular moment (the handlers in the yellow box). 

<img src="../img/Observable.png" width="80%">

Observable might emit data like:
* normal data packages which will never complete (for example, click a button: you never know how many time a user may click a button);
* error;
* it may get completed (for example, http-request)


<img src="../img/Observable_2.png" width="80%">

## Operators
TODO
<img src="../img/operators.png" width="80%">

## Subjects
TODO

## Resourcse
* https://rxjs-dev.firebaseapp.com/



