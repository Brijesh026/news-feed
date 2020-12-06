import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewsServiceService } from '../news-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-part-two',
  templateUrl: './part-two.component.html',
  styleUrls: ['./part-two.component.css']
})
export class PartTwoComponent implements OnInit {

  newsId: string;

  constructor(
    private fb: FormBuilder, 
    private news: NewsServiceService,
    private route: ActivatedRoute) { }

  secondPart = this.fb.group({
    isBreaking: ["", Validators.required],
    comments: ["", [Validators.required, Validators.minLength(10)]]
  });

  get isBreaking(){
    return this.secondPart.get("isBreaking");
  }

  get comments(){
    return this.secondPart.get("comments");
  }

  ngOnInit(): void {
    if(this.news.editMode){
      this.route.paramMap.subscribe( params =>{
        this.newsId = params.get('id');
      });

      if(this.newsId){
        this.getNewsArticle(this.newsId);
      }
    }
  }

  getNewsArticle(newsId: string){
    const newsArticle = this.news.newsFeed.filter( item => item.id === newsId)[0];
    this.secondPart.patchValue({
      isBreaking: newsArticle.isBreaking,
      comments: newsArticle.comments,
    });
  }

  handleNews(){
    this.news.handleSecondPart(this.secondPart.value);
  }

}
