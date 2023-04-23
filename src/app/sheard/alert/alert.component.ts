import {AfterContentInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements  AfterContentInit{
  @Input() color = 'blue'
  get bgColor() {
    return`bg-${this.color}-400`;
  }


  ngAfterContentInit(){
  }

  constructor() { }

}
