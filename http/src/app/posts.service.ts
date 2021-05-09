import {Injectable} from '@angular/core';
import {Post} from './post.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {map} from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient, private authService: AuthService){}
  createAndStorePost(postData: Post){
    //const postData: Post = {title: title, content: content};

    this.http.post<Post>(
      'http://localhost:8080/collection1',
      postData, this.authService.httpOptions).subscribe(resposeData => {
      console.log(resposeData);
    });

  }
  fetchPosts(){
    this.http
      .get<Post>('http://localhost:8080/collection1', this.authService.httpOptions)
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
        })
      )
      .subscribe(posts => {
        // console.log(posts);
        //this.isFatching = false;
        //this.loadedPosts = posts;
      });

  }

}
