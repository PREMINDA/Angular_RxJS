import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ClipComponent} from './clip/clip.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
