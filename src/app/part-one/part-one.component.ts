import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsServiceService } from './../news-service.service';

@Component({
  selector: 'app-part-one',
  templateUrl: './part-one.component.html',
  styleUrls: ['./part-one.component.css']
})
export class PartOneComponent implements OnInit {

  newsId: string = "";
  constructor(
    private fb: FormBuilder, 
    private news: NewsServiceService,
    private route: ActivatedRoute
    ) { }

  firstPart = this.fb.group({
    id:[],
    title: ["",[Validators.required, Validators.minLength(10)]],
    description: ["", [Validators.required, Validators.minLength(20)]],
    author: ["", [Validators.required]],
    category: ["", [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit(): void {
    if(!this.news.editMode)
      this.firstPart.patchValue({
        id: `LNN${this.news.newsFeed.length+1}`
      });
    
    if(this.news.editMode){
      this.route.paramMap.subscribe( params =>{
        this.newsId = params.get('id');
      });
      if(this.newsId){
        this.getNewsArticle(this.newsId);
      }
    }

  }

  get title(){
    return this.firstPart.get("title");
  }

  get description(){
    return this.firstPart.get("description");
  }

  get author(){
    return this.firstPart.get("author");
  }

  get category(){
    return this.firstPart.get("category");
  }

  getNewsArticle(newsId: string){
    const newsArticle = this.news.newsFeed.filter( item => item.id === newsId)[0];
    this.firstPart.patchValue({
      id: newsArticle.id,
      title: newsArticle.title,
      description: newsArticle.description,
      author: newsArticle.author,
      category: newsArticle.category
    });
  }

  handleNews(){
    this.news.handleFirstPart(this.firstPart.value);
  }
  
}
