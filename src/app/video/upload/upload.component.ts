import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {v4 as uuid} from 'uuid'
import {last, switchMap} from "rxjs";
import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import IClip from "../../modals/clip.modal";
import {ClipService} from "../../services/clip.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy{
  isDragover = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  showColor = 'blue';
  alertMsg = 'Please Wait!';
  isSubmitted = false;
  percentage = 0;
  showPercentage = false;
  user : firebase.User | null = null;
  task?: AngularFireUploadTask ;
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  uploadForm = new FormGroup({
    title: this.title
  })


  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipService: ClipService
  ) {
    auth.user.subscribe(user=>this.user = user);
  }

  ngOnDestroy(): void {
        this.task?.cancel();
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
    this.uploadForm.disable();
    this.showAlert = true;
    this.showColor = 'blue';
    this.alertMsg = 'Please Wait!';
    this.isSubmitted = true;
    this.showPercentage = true;

    const fileName = uuid();
    const  clipPath = `clip/${fileName}.mp4`;
    this.task = this.storage.upload(clipPath,this.file);
    const ref = this.storage.ref(clipPath);
    this.task.percentageChanges().subscribe(progress =>{
      this.percentage = progress as number/100
    })
    this.task.snapshotChanges().pipe(
      last(),
      switchMap(()=>ref.getDownloadURL())
    ).subscribe({
      next:(url)=>{
        const clipData:IClip = {
          uid: this.user?.uid,
          displayName: this.user?.displayName,
          title: this.title.value,
          fileName: `${clipPath}.mp4`,
          url:url
        }
        this.clipService.createClip(clipData);
        this.showColor = 'green';
        this.alertMsg = 'Success !';
        this.showPercentage = false;
      },
      error:(error)=>{
        this.showColor = 'red';
        this.alertMsg = 'Try again';
        this.isSubmitted = false;
        this.uploadForm.enable();
      }
    })

  }
}
