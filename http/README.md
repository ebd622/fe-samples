# Marking HTTP requests

## Key points
* L254: [Sending a POST request](#l254-sending-a-post-request)
* L255: [Getting data](#l255-getting-data)
* L256: [Using RxJS Operators to transform data](#l256-using-rxjs-operators-to-transform-data)
* L257: Using Types with the HttpClient
* L258: Outputting Posts
* L259: Showing a loading indicator
* L260: Using Using a service for Http Request
* L261: Services & Components working together
* L262: Sending s DELETE request
* L263: Handling errors
* L264:


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


