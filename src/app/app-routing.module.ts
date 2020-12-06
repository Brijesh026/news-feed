import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartOneComponent } from './part-one/part-one.component';
import { PartTwoComponent } from './part-two/part-two.component';
import { NewsBoardComponent } from './news-board/news-board.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "part1", component: PartOneComponent},
  {path: "part2", component: PartTwoComponent},
  {path: "editPart1/:id", component: PartOneComponent, canActivate: [AuthGuard]},
  {path: "editPart2/:id", component: PartTwoComponent, canActivate: [AuthGuard]},
  {path: "newsBoard", component: NewsBoardComponent},
  {path: "**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
