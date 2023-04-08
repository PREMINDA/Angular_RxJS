import {Component, ElementRef, Input,OnDestroy} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnDestroy{
  @Input() ModalId = '';
  constructor(
    public modal : ModalService,
    public el: ElementRef
  ) {
  }

  closeModal(id:string):void{
    this.modal.toggleModal(id);
  }

  ngOnDestroy() {

  }

}
