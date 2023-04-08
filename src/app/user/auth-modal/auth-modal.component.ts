 import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit,OnDestroy{
  constructor(
    public modal:ModalService,
    public el: ElementRef
  ) {
  }
  ngOnInit(): void {
    this.modal.registerModal("auth");
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.modal.unRegisterModal("auth");
  }

}
