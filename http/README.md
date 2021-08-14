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
            postArray.push({...responseData[key], id: key});
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
Angular supports **generics**, in the example above the methods `post` and `get` support generics.



