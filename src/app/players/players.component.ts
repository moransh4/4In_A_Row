import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit{
  @Output() playersUpdated = new EventEmitter();
  players : any[] = [{ name: '', color: 'blue' }, { name: '', color: 'red' }];
  start_game : boolean = false;


  constructor() {
   }

  ngOnInit() {
  }

  onInputFocus(ev) {
    classie.add(ev.target.parentNode, 'input--filled');
  }

  onInputBlur(ev) {
    if (ev.target.value.trim() === '') {
      classie.remove(ev.target.parentNode, 'input--filled');
    }
  }

    startGame() {
    if (this.players[0].name.trim() != '' && this.players[1].name.trim() != '') {
      this.start_game = true;
      this.playersUpdated.emit({ players : this.players, start: this.start_game });
    }
  }

  resetGame() {
    this.players[0].name = '';
    this.players[1].name = '';
    this.start_game = false;
    this.playersUpdated.emit({ players : this.players, start: this.start_game });
  }


}
