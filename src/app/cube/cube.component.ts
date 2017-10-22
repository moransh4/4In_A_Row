import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {
  @Input() selected : Position;
  
  constructor() { }

  ngOnInit() {    
  }

   clicked(event) {
     console.log(event);
  }

  getStyle(event){
    return event.color;
  }

}
