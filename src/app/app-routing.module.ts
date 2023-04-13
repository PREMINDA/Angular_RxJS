import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ClipComponent} from './clip/clip.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'about', // example.com/about
    component: AboutComponent
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch : 'full'
  },
  {
    path: 'clip/:id',
    component: ClipComponent
  },
  {
    path:'**',
    pathMatch: 'full',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
