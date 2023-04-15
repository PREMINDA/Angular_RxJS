import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import {SheardModule} from '../sheard/sheard.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SheardModule,
    ReactiveFormsModule
  ]
})
export class VideoModule { }
