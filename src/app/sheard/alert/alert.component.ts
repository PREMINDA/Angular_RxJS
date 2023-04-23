import {AfterContentInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements  AfterContentInit{
  @Input() color = 'blue'
  colorInTemp = 'bg-blue-400'
  bgColor() {
    this.colorInTemp = `bg-${this.color}-400`;
  }


  ngAfterContentInit(){
    this.bgColor()
  }

  constructor() { }

}
