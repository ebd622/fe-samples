# Marking HTTP requests

## Key points
* L254: [Sending a POST request](#l254-sending-a-post-request)
* L255: Getting data
* L256: Using RxJS Operators to transform data
* L257: Using Types with the HttpClient
* L258: Outputting Posts


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
### L257: Using RxJS Operators to transform data
After fetching data we may need to transform them. A good practice is to use `operators` for this.
