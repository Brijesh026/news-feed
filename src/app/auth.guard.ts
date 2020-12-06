import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NewsServiceService } from './news-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private news: NewsServiceService,
    private _router: Router
  ){}

  canActivate( ): boolean {
    if(this.news.editMode){
      return true;
    }
    else {
      this._router.navigate(['/']);
      return false;
    }
  }
  
}
