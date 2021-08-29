# Marking HTTP requests

## Key points
* L254: [Sending a POST request](#l254-sending-a-post-request)
* L255: [Getting data](#l255-getting-data)
* L256: [Using RxJS Operators to transform data](#l256-using-rxjs-operators-to-transform-data)
* L257: Using Types with the HttpClient
* L258: Outputting Posts
* L259: Showing a loading indicator
* L260: [Using Using a service for Http Request](#l260-using-using-a-service-for-http-request)
* L261: [Services & Components working together](#l261-services--components-working-together)
* L262: [Sending s DELETE request](#l262-sending-s-delete-request)
* L263: [Handling errors](#l263-handling-errors)
* L264: Using subjects for error handling
* L265: [Using the catchError operator](#l265-using-the-catcherror-operator)
* L266: [Error handling & UX](#l266-error-handling--ux)
* L267: [Setting headers](#l267-setting-headers)
* L268: Adding query params
* L269: Observing different type of responses
* L270: Changing a resonse body type
* L271: Introducing interceptors



### L254: Sending a POST request
In [app.component.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.ts):

```
  constructor(private http: HttpClient, ...) {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post('http://....', postData)
      .subscribe(
        responseData => {
          console.log(responseData);
        }
      );
  }
```
The method `post` returns an Observable, we need to subscribe to it.

### L255: Getting data
To fetch data we can use a dedicated method `fetchPosts()` and call it in different places ([app.component.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.ts)):

```
ngOnInit() {
    this.fetchPosts();
}
  
onFetchPosts() {
    // Send Http request
    this.fetchPosts();
}

private fetchPosts(){
  this.http
    .get('http://...')
    .subscribe(posts => {
      console.log(posts);
    });
}
```
### L256: Using RxJS Operators to transform data
After fetching data we may need to transform them. A good practice is to use `operators` for this. Let's use the operator `map` two transform our post-reponse into an array:

```
private fetchPosts(){
  this.http
    .get('http://...')
    .pipe(
      .map(responseData => {
        const postArray = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            // This will pull out all the key-values pairs from the nested object
            postArray.push({...responseData[key]});
          }
        }
        return postArray;
      });
    )
    .subscribe(posts => {
      // Here posts is an array (a content of postArray)
      console.log(posts);
    });
}

```
See also [RxJS Operators](https://rxjs.dev/guide/operators)

### L257: Using Types with the HttpClient
Angular supports **generics**, in the example above the methods `post` and `get` support generics. For instance, let's use the interface [Post](https://github.com/ebd622/fe-samples/blob/master/http/src/app/post.model.ts) in the previous example:

```
private fetchPosts(){
  this.http
    .get<Post>('http://...')
    .pipe(
      .map(responseData => {
        const postArray: Post[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            // This will pull out all the key-values pairs from the nested object
            postArray.push({...responseData[key]});
          }
        }
        return postArray;
      });
    )
    .subscribe(posts => {
      // Here posts is an array (a content of postArray)
      console.log(posts);
      this.loadedPosts = posts;
    });
}

```
It means that `get` will return a `Post` type as a result. The same can be done for a `post` method. <br/>
A full example you can see in [posts.service.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/posts.service.ts)

### L258: Outputting Posts
When `Post` is retrieved it can be printed in a template ([app.component.html](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.html)):
```
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <p *ngIf="loadedPosts.length < 1> No posts available!</p>
      <ul class="list-group" *ngIf="loadedPosts.length >= 1>
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h3>{{post.title}}</h3>
          <p>{{post.content}}</p>
        </li>
      </ul>
    </div>
```

### L259: Showing a loading indicator
Let's add a property `ifFetching` to show a loading indicator. <br/>

```
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  ...
  
   
private fetchPosts(){
  this.isFetching = true;
  this.http
    .get<Post>('http://...')
      ...
    )
    .subscribe(posts => {
      ...
      this.isFetching = false;
    });
}


...

}
```
Then the property can be used in a template to print a message `Loading...`:

```
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <p *ngIf="loadedPosts.length < 1 && !isFetching">No posts available!</p>
      <ul class="list-group" *ngIf="loadedPosts.length >= 1 && !isFatching">
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h3>{{post.title}}</h3>
          <p>{{post.content}}</p>
        </li>
      </ul>
      <p *ngIf="isFetching>Loading...</p>
    </div>
  </div>
```

### L260: Using Using a service for Http Request
It always makes sense to separate a component and service. <br/>
We can create [posts.service.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/posts.service.ts) to make `post` and `get` requests.

### L261: Services & Components working together
A best practice, when working with http-requests, is to move details related to a template to a component. In our example we create http-subject in a service, but subscribe to it - in the compoment. A request will sent only when we subsctibe to an observable.

In the [posts.service.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/posts.service.ts) we only prepare an Observable:

```
  fetchPosts(){
    return this.http
      .get<Post>('http://localhost:8080/collection1', this.authService.getAuthHeaders())
      .pipe(
        map(responseData => {
          const postArray: Post[] = [];
          ...
          return postArray;
        })
      );
  }
```
Then in the [app.component.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.ts)  we will subscribe to it:

```
  ngOnInit() {
    this.fetchPosts();
  }
  
  ...
  
  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }
  
  ...
  
  private fetchPosts(){
    this.isFatching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFatching = false;
      this.loadedPosts = posts;
    });
  }  
```
This way we detach a service and UI.

### L262: Sending s DELETE request
In a similar way we can send a delete request:

[posts.service.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/posts.service.ts) 

```
  deletePosts(){
    return this.http.delete('http://localhost:8080/collection1', this.authService.getAuthHeaders());
  }
```
[app.component.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.ts) 
```
  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
```
In the component we subscribe to observable to clean up all the posts: `this.loadedPosts = []`. We know that the method in observable (`() => {
this.loadedPosts = [];`) will be only calles when observable succeed.

### L263: Handling errors
Observable supports a few arguments, the second argument is a function that triggers whenever an error is thrown.

[app.component.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.ts) 

```
  private fetchPosts(){
    this.isFatching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFatching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFatching = false;
      this.error = error.message;
      console.log(error);
    });
  }
```

[app.component.html](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.html) 
```
   <div class="alert alert-danger" *ngIf="error">
     <h1>An Error occured!</h1>
     <p> {{ error }}</p>
   </div>
 ```
 
### L265: Using the catchError operator
A special opetator `catchError` can help to handle errors:

```
import {map,catchError} from 'rxjs/internal/operators';
import {throwError} from 'rxjs';
...

  fetchPosts(){
    return this.http
      .get<Post>('http://localhost:8080/collection1', this.authService.getAuthHeaders())
      .pipe(
        map(responseData => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            console.log(responseData[key]);
            if (responseData.hasOwnProperty(key)){
              //postArray.push({...responseData[key], id: responseData[key]._id.$oid});
              postArray.push({title: responseData[key].title, content: responseData[key].content, id: responseData[key]._id.$oid});
            }
          }
          return postArray;
        }),
        catchError(errorRes => {
          //Send to analytics server or do whatever you need
          return throwError(errorRes);
        })
      );
  }
```
After hanling an error (sending it to analytic server, for example) you still need to return observable. This can be done with `throwError` - it will yield a new observable by wrapping an error.

### L266: Error handling & UX
Let's add a button on UI to get rid of error message box when error happened:

[app.component.html](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.html) 
```
   <div class="alert alert-danger" *ngIf="error">
     <h1>An Error occured!</h1>
     <p> {{ error }}</p>
     <button class="btn btn-danger" (click)="onHandleError()">Ok</button>
   </div>
```
When clicking the button it will call the method `onHandleError()`:

[app.component.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.ts) 

```
 onHandleError(){
    this.error = null;
 }
```
This will reset `this.error` to null, after this an error message box will be removed on UI.

### L267: Setting headers
Every methon of the http-client (POST, GET, ...) supports providing headers in a request:

```
private fetchPosts(){
  this.http
    .get<Post>(
      'http://...',
      {
        headers: new HttpRequest({'Custom-Header' : 'Hello'})    
      }
    )
    .pipe(
      ...
    )
    .subscribe(posts => {
      ...
    });
}
```

### L268: Adding query params
Use `HttpParams` to add query params:

```
private fetchPosts(){
  this.http
    .get<Post>(
      'http://...',
      {
        headers: new HttpRequest({'Custom-Header' : 'Hello'}),
        params: new HttpParams().set('print', 'pretty')
      }
    )
    .pipe(
      ...
    )
    .subscribe(posts => {
      ...
    });
}
```
When you need to add multiple params you can do it using a variable:
```
private fetchPosts(){
  let searchParams = new HttpParams();
  searchParams = searchParams.append('print','pretty');
  searchParams = searchParams.append('custom','key');
  this.http
    .get<Post>(
      'http://...',
      {
        headers: new HttpRequest({'Custom-Header' : 'Hello'}),
        params: searchParams
      }
    )
    .pipe(
      ...
    )
    .subscribe(posts => {
      ...
    });
}
```
It is possible to add query-patams in URL but using `HttpRequest` is more convinient way, especially when you have to provide many query-params.

### L269: Observing different type of responses
We may need to have an access to an entire response (with a status code, headers and so on), not only body data. It can be done providing an exra parameter to an http-request:
```
{
  observe: 'response'
}
```
(A default value for `observe` is `body`)

For example, this is a post request where we will use `observe: 'response'`:

```
  createAndStorePost(postData: Post){
    this.http.post<Post>(
      'http://localhost:8080/collection1',
      postData,
      {
        observe: 'response' // It's requre to get a full response (i.e. headers, status code and so on)
      }
      // this.authService.getAuthHeaders()
    ).subscribe(resposeData => {
      console.log(resposeData);
    });
  }
```
In this way `resonseData` will include a whole http-response object.

We can also use `observe` with http.delete :

```
  deletePosts(){
    return this.http
      .delete('http://localhost:8080/collection1', this.authService.getAuthHeaders(),{
        observe: 'events'
      })
      .pipe(
        tap(event => {
          console.log(event);
        })
      );
  }
```
This way we observe `events` which may be not only response-event but also other events.

It is also possible to improve logging depending on an event-type:

```
      ...
      .pipe(
        tap(event => {
          console.log(event);
          if(event.type === HttpEventType.Sent){
          //Do something
          }
          if(event.type === HttpEventType.Response){
          console.log(event.body);
          }
        })
      );

      ...
```
This is how we can use the events if we need very granual control over how we updtate UI and in which phase a request currenly is.

### L270: Changing a resonse body type
We can also configure a response type. A default `responseType` is json, but it is possible to overwrite it:

```
  deletePosts(){
    return this.http
      .delete('http://localhost:8080/collection1', this.authService.getAuthHeaders(),{
        observe: 'events',
        responseType: 'text'
      })
      .pipe(
        ...
      );
  }
```
In this way a response will be a `text`. It is also possible to use `blob` as a responseType.
