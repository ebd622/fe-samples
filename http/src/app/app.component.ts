import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Post} from './post.model';
import {PostsService} from './posts.service';
import {post} from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFatching = false;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // console.log(postData);
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
    // Send Http request
  }

  private fetchPosts(){
    this.isFatching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFatching = false;
      this.loadedPosts = posts;
    });
  }
}
