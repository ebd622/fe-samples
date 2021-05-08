import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('admin:secret')
    })
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //console.log(postData);
    this.http.post(
      'http://localhost:8080/collection1',
      postData, this.httpOptions).subscribe(resposeData => {
        console.log(resposeData);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http
      .get('http://localhost:8080/collection1', this.httpOptions)
      .pipe(
        map(responseData => {
          const postArray = [];
          for (const key in responseData) {
            // console.log(responseData[key]._id.$oid);
            if (responseData.hasOwnProperty(key)){
              postArray.push({...responseData[key], id: responseData[key]._id.$oid});
            }
          }
          return postArray;
        })
      )
      .subscribe(posts => {
        console.log(posts);
      });
  }
}
