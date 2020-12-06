import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from './../news-service.service';

@Component({
  selector: 'app-news-board',
  templateUrl: './news-board.component.html',
  styleUrls: ['./news-board.component.css']
})
export class NewsBoardComponent implements OnInit {
  
  localNewsFeed = [];
  
  constructor(private news: NewsServiceService) { }


  ngOnInit(): void {
    this.localNewsFeed = this.news.newsFeed;
  }

  
  handleEdit(id: string){
    this.news.editMode = true;
    this.news.handleEditPartOne(id);
  }

  handleDelete(item){
    this.news.handleDelete(item);
  }

}
