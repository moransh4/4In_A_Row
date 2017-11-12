import { Component, OnInit } from '@angular/core';
import * as Fireworks from 'fireworks-canvas/dist/fireworks';


class Position {
  state: boolean;
  color: string;
  row: any;
  col: any;
  right: number;
  left: number;
  top: number;
  buttom: number;
  top_right: number;
  top_left: number;
  buttom_right: number;
  buttom_left: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.right = this.left = this.top = this.buttom = 0;
    this.top_left = this.top_right = this.buttom_left = this.buttom_right = 0;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent extends Position {
  title : string = '4 in a row!';
  cells : number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  players : any[] = [{ name: '', color: 'blue' }, { name: '', color: 'red' }];
  player : number = 0;
  start_game : boolean = false;
  flag : boolean = false;
  winner : number = -1;
  private cube: Position[][];
  container : object = document.getElementById('playground');
  options : object = 
  {
  maxRockets: 3,            // max # of rockets to spawn
  rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
  numParticles: 100,        // number of particles to spawn when rocket explodes (+0-10)
  explosionHeight: 0.2,     // minimum percentage of height of container at which rockets explode
  explosionChance: 0.08     // chance in each tick the rocket will explode
}




  constructor() {
    super(0, 0);
  }

  ngOnInit() 
  {
    this.cube = [];
    const fireworks = new Fireworks.start(this.container, this.options)
    for (var i: number = 0; i < this.cells.length; i++) {
      this.cube[i] = [];
      for (var j: number = 0; j < this.cells.length; j++) {
        this.cube[i][j] = new Position(i, j);
        this.cube[i][j].state = false;
        this.cube[i][j].color = '#cccc00';
      }
    }

  }


  handleplayersUpdated(event) {
  this.players = event.players;
  this.start_game = event.start;
  this.winner = -1;
  this.flag = false;
  this.ngOnInit();
  }


  clicked(event) {
    if (!this.flag && this.start_game) {
      var i = 0;
      this.flag = true;
      while (this.cube && i < this.cells.length && !this.cube[i][event].state) {
        ((i) => {
          setTimeout(() => {
            this.cube[i][event].color = this.players[this.player].color;
          }, 78 * i);
          setTimeout(() => {
            this.cube[i][event].color = '#cccc00'
          }, 90 * i);
        })(i);
        i++

      }
      if (i > 0) {
        let time = i == 1 ? 0 : 90 * this.cells.length;
        let row = i - 1;
        new Promise((resolve, reject) => {
          setTimeout(() => {
            this.cube[row][event].color = this.players[this.player].color;
            this.cube[row][event].state = true
            if (this.checkeWinnerColl(row, event) || this.checkeWinnerRow(row, event) || this.checkeWinnerSlant(row, event)) {
              console.log(this.players[this.player], "win!!");
              this.winner = this.player;
              this.flag = true;
            }
            resolve();
          }, time);
        }).then(() => {
          if (this.winner == -1) {
            this.player = this.player == 0 ? 1 : 0;
            this.flag = false;
          }
        });
      }
    }
  }

  checkeWinnerColl(row, col) {
    if (col > 0 && this.cube[row][col - 1].state && this.cube[row][col - 1].color == this.players[this.player].color) {
      this.cube[row][col].left = this.cube[row][col - 1].left + 1;
    }
    if (col < this.cells.length - 1 && this.cube[row][col + 1].state && this.cube[row][col + 1].color == this.players[this.player].color) {
      this.cube[row][col].right = this.cube[row][col + 1].right + 1;
    }

    let l = 1;
    while (l < 4 && (col - l) >= 0 && this.cube[row][col - l].color == this.players[this.player].color) {
      this.cube[row][col - l].right = this.cube[row][col - l + 1].right + 1;
      l++;
    }
    let r = 1;
    while (r < 4 && (col + r) <= this.cells.length - 1 && this.cube[row][col + r].color == this.players[this.player].color) {
      this.cube[row][col + r].left = this.cube[row][col + r - 1].left + 1;
      r++;
    }

    let sumColl = this.cube[row][col].left + this.cube[row][col].right;
    if (sumColl >= 3) {
      return true;
    }
    return false;
  }

  checkeWinnerRow(row, col) {
    if (row > 0 && this.cube[row - 1][col].state && this.cube[row - 1][col].color == this.players[this.player].color) {
      this.cube[row][col].top = this.cube[row - 1][col].top + 1;
    }
    if (row < this.cells.length - 1 && this.cube[row + 1][col].state && this.cube[row + 1][col].color == this.players[this.player].color) {
      this.cube[row][col].buttom = this.cube[row + 1][col].buttom + 1;
    }

    let t = 1;
    while (t < 4 && (row - t) >= 0 && this.cube[row - t][col].color == this.players[this.player].color) {
      this.cube[row - t][col].buttom = this.cube[row - t + 1][col].buttom + 1;
      t++;
    }
    let b = 1;
    while (b < 4 && (row + b) <= this.cells.length - 1 && this.cube[row + b][col].color == this.players[this.player].color) {
      this.cube[row + b][col].top = this.cube[row + b - 1][col].top + 1;
      b++;
    }

    let sumRow = this.cube[row][col].top + this.cube[row][col].buttom;
    if (sumRow >= 3) {
      return true;
    }
    return false;
  }

  checkeWinnerSlant(row, col) {
    if ((row - 1) >= 0 && (col + 1) < this.cells.length && this.cube[row - 1][col + 1].state && this.cube[row - 1][col + 1].color == this.players[this.player].color) {
      this.cube[row][col].top_right = this.cube[row - 1][col + 1].top_right + 1;
    }
    if ((row + 1) < this.cells.length && (col - 1) >= 0 && this.cube[row + 1][col - 1].state && this.cube[row + 1][col - 1].color == this.players[this.player].color) {
      this.cube[row][col].buttom_left = this.cube[row + 1][col - 1].buttom_left + 1;
    }

    if ((row - 1) >= 0 && (col - 1) >= 0 && this.cube[row - 1][col - 1].state && this.cube[row - 1][col - 1].color == this.players[this.player].color) {
      this.cube[row][col].top_left = this.cube[row - 1][col - 1].top_left + 1;
    }
    if ((row + 1) < this.cells.length && (col + 1) < this.cells.length && this.cube[row + 1][col + 1].state && this.cube[row + 1][col + 1].color == this.players[this.player].color) {
      this.cube[row][col].buttom_right = this.cube[row + 1][col + 1].buttom_right + 1;
    }


    let i = 1;
    while (i < 4) {
      this.updateCells(row, col, row - i, col + i);
      i++;
    }
    i = 1;
    while (i < 4) {
      this.updateCells(row, col, row + i, col - i);
      i++;
    }
    i = 1;
    while (i < 4) {
      this.updateCells(row, col, row + i, col + i);
      i++;
    }
    i = 1;
    while (i < 4) {
      this.updateCells(row, col, row - i, col - i);
      i++;
    }

    let slantLeft = this.cube[row][col].top_left + this.cube[row][col].buttom_right;
    let slantRight = this.cube[row][col].top_right + this.cube[row][col].buttom_left;
    if (slantLeft >= 3 || slantRight >= 3) {
      return true;
    }
    return false;
  }

  updateCells(r, c, r1, c1) {
    let RowInRange = (r1 - r >= 0) ? r1 < this.cells.length : r1 >= 0;
    let ColInRange = (c1 - c >= 0) ? c1 < this.cells.length : c1 >= 0;
    if (RowInRange && ColInRange && this.cube[r1][c1].state && this.cube[r1][c1].color == this.cube[r][c].color) {
      this.checkCorner(r, c, r1, c1);
      return true;
    }
    return false;
  }

  checkCorner(r, c, r1, c1) {
    if ((r1 - r) >= 0 && (c1 - c) >= 0 && this.cube[r1][c1].color == this.cube[r1 - 1][c1 - 1].color) {
      this.cube[r1][c1].top_left = this.cube[r1 - 1][c1 - 1].top_left + 1;
    }
    if ((r1 - r) < 0 && (c1 - c) < 0 && this.cube[r1][c1].color == this.cube[r1 + 1][c1 + 1].color) {
      this.cube[r1][c1].buttom_right = this.cube[r1 + 1][c1 + 1].buttom_right + 1;
    }
    if ((r1 - r) >= 0 && (c1 - c) < 0 && this.cube[r1][c1].color == this.cube[r1 - 1][c1 + 1].color) {
      this.cube[r1][c1].top_right = this.cube[r1 - 1][c1 + 1].top_right + 1;
    }
    if ((r1 - r) < 0 && (c1 - c) >= 0 && this.cube[r1][c1].color == this.cube[r1 + 1][c1 - 1].color) {
      this.cube[r1][c1].buttom_left = this.cube[r1 + 1][c1 - 1].buttom_left + 1;
    }
  }
}

         