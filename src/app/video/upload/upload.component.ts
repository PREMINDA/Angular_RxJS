import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {v4 as uuid} from 'uuid'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  isDragover = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  showColor = 'blue';
  alertMsg = 'Please Wait!';
  inSubmission = false;
  percentage = 0;
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  uploadForm = new FormGroup({
    title: this.title
  })


  constructor(
    private storage: AngularFireStorage
  ) {
  }

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if(!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/,'')
    );
    console.log(this.file)
    this.nextStep = true;

  }

  uploadFile() {
    this.showAlert = true;
    this.showColor = 'blue';
    this.alertMsg = 'Please Wait!';
    this.inSubmission = true;

    const fileName = uuid();
    const  clipPath = `clip/${fileName}.mp4`;
    const task = this.storage.upload(clipPath,this.file);
    task.percentageChanges().subscribe(progress =>{
      this.percentage = progress as number/100
    })

  }
}
