import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-quadro-page',
  templateUrl: './modal-quadro-page.component.html'
})
export class ModalQuadroPageComponent implements OnInit {
  @Input() image;
  @Input() timeStamp : any;
  constructor() { }

  ngOnInit() {
  }

  public getLinkPicture() {
    //if(this.timeStamp) {
      //console.log(this.image + '?' + this.timeStamp);
      //return this.image + '?' + this.timeStamp;
    //}
    //console.log(this.image);
    return this.image;
  }  

}
