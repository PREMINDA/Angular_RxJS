import {Component, Input} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() ModalId = '';
  constructor(public modal : ModalService) {
  }

  closeModal(id:string):void{
    this.modal.toggleModal(id);
  }

}
