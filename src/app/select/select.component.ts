import { Component, OnInit,  Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
    @Input() color : string;

  constructor() { }

  ngOnInit() {
  }

}
