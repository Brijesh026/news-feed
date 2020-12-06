import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NewsServiceService {
  editMode: boolean = false;
  toBeEditedNewsId: string = "";

  singleArticle = {
      id:null,
      title: "",
      description: "",
      author: "",
      category: "",
      isBreaking: "",
      comments: ""
  };
  
  newsFeed = [
    {
      id: "LNN2",
      title: "PM leaves for 2 days visit to France",
      description: "Prime Minister has left for France where he will be holding bilateral talks with the French President.",
      author: "Ram Kumar",
      category: "Politics",
      isBreaking: "Yes",
      comments: "running story"
    },
    {
      id: "LNN1",
      title: "Virat Kohli hits 30th ODI century",
      description: "Indian Team Cricket Caption Viart kohli has hit his 30th ODI century playing against England at Lords.",
      author: "Mahesh Babu",
      category: "Sports",
      isBreaking: "No",
      comments: "hot news for today"
    },
  ];
  
  constructor(private _router: Router) { }
  
  handleFirstPart(part1: Object){
    this.singleArticle = {...this.singleArticle, ...part1}
  }

  handleSecondPart(part2: Object){
    this.singleArticle = {...this.singleArticle, ...part2}
    this.handlePostNews();
  }

  handleEditPartOne(id: string){
    this._router.navigate(['/editPart1', id]);
  }

  handlePostNews(){
    
    for (let key in this.singleArticle) {
      if (this.singleArticle[key] === null || this.singleArticle[key] === ""){
        return alert("Part1 is not filled. Cannot publish.");
      }
    }

    if(!this.editMode)
      this.newsFeed.unshift(this.singleArticle);
    else {
      const editedItem = this.newsFeed.filter(item => item.id === this.singleArticle.id)[0];
      const index = this.newsFeed.indexOf(editedItem)
      this.newsFeed.splice(index,1,this.singleArticle);
    }

    this.editMode = false;
    
  }

  handleDelete(item){
    const index = this.newsFeed.indexOf(item);
    this.newsFeed.splice(index, 1);
  }


}
