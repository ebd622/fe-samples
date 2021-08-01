# Marking HTTP requests

## Key points
* L254: Sending a POST request
* L255: 


### L254: Sending a POST request
In [app.component.ts](https://github.com/ebd622/fe-samples/blob/master/http/src/app/app.component.ts):

```
  constructor(private http: HttpClient, private postService: PostsService) {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData);
  }
```

