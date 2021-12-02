import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
API_URL = `infobethania.wordpress.com`;
allBlogs = null;
pages: any;

  constructor(private http:HttpClient) { }
  
  fetchDate(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      params:{
        pre_page: '5',
        page: ''+page
      }
    };
    return this.http.get<any[]>(`${this.API_URL}post?`, options)
    .pipe(
      map((response)=>{
        this.pages = response['headers'].get('x-wp-totalpages');
        this.allBlogs = response['headers'].get('x-wp-total')
        return response['body'];
      })
    )
  }

  single(id){
    return this.http.get(`${this.API_URL}posts/${id}`)
    .pipe(
      map((data)=>{
        return data;
      })
    )
  }

}
