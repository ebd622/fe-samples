import {Injectable} from '@angular/core';
import {Post} from './post.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {map} from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient, private authService: AuthService){}

  // Here we create observable and also subscribe to it
  createAndStorePost(postData: Post){
    this.http.post<Post>(
      'http://localhost:8080/collection1',
      postData,
      {
        observe: 'response', // It's requre to get a full response (i.e. headers, status code and so on)
        headers: this.authService.getAuth()
      }
      // this.authService.getAuthHeaders()
    ).subscribe(resposeData => {
      console.log(resposeData);
    });
  }
  // The method returns observable ("subscribe" is used in app.module)
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
        })
      );
  }

  deletePosts(){
    // TODO: this doesn't work with RestHeart API! Quetsion: how to delete ALL documents in RestHeart API???
    return this.http.delete('http://localhost:8080/collection1', this.authService.getAuthHeaders());
  }

}
