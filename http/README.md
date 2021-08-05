# Marking HTTP requests

## Key points
* L254: Sending a POST request
* L255: Getting data
* L256: Using RxJS Operators to transform data
* L257: Using Types with the HttpClient
* L258: 


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
