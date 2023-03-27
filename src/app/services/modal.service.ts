import { Injectable } from '@angular/core';
import {ModalInterface} from './ModalInterface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalList: ModalInterface[] = []

  constructor() { }

  registerModal(id:string):void{
    this.modalList.push({id:id,isOpen:false});
  }

  unRegisterModal(id:string):void{
    this.modalList = this.modalList.filter((item:ModalInterface)=>item.id != id);
  }

  isModalOpen(id:string):boolean{
    return !!this.modalList.find((item:ModalInterface)=>item.id == id)?.isOpen;
  }

  toggleModal(id:string):void{
    const modal = this.modalList.find((item:ModalInterface)=>item.id == id);
    if (modal){
      modal.isOpen = ! modal.isOpen;
    }
  }
}
