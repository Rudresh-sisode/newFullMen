import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject}from 'rxjs';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({providedIn:'root'})
export class PostsService {

  private posts:Post[]=[];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http:HttpClient)
  {

  }

  getPosts(){
    this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map((post: { title: any; content: any; _id: any; })=>{
        return {
          title:post.title,
          content:post.content,
          id:post._id
        };
      })
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    })
    //spread operator
  }

  getPost(id:string){
    return this.http.get<{_id:string,title:string,content:string}>
    ("http://localhost:3000/api/posts/"+id);
     //{...this.posts.find(p => p.id === id)}
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }

  addPost(title:string,content:string){
    const post:Post={id:null,title:title,content:content};
    this.http.post<{message:string,postID:string}>("http://localhost:3000/api/posts",post)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      const ID=responseData.postID
    post.id=ID;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })
  }
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id:string,title:string,content:string){
    const post:Post={id:id,title:title,content:content};
    this.http.put("http://localhost:3000/api/posts/"+id,post)
    .subscribe(response =>{
      const updatedPosts=[...this.posts]
      const oldPostIndex=updatedPosts.findIndex(p=> p.id === post.id)
      updatedPosts[oldPostIndex]=post;
      this.posts=updatedPosts;
      this.postsUpdated.next([...this.posts])

    })
  }

}
/*
rxjs is all about observable
*/
