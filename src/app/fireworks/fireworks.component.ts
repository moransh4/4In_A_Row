import { Component, OnInit, Injectable } from '@angular/core';

declare const Fireworks;


@Component({
  selector: 'app-fireworks',
  templateUrl: './fireworks.component.html',
  styleUrls: ['./fireworks.component.scss']
})
export class FireworksComponent implements OnInit {
  container : object ;
  fireworks : object;
  options : object = 
  {
      maxRockets: 10,            // max # of rockets to spawn
      rocketSpawnInterval: 20, // millisends to check if new rockets should spawn
      numParticles: 150,        // number of particles to spawn when rocket explodes (+0-10)
      explosionHeight: 0.5,     // minimum percentage of height of container at which rockets explode
      explosionChance: 0.08     // chance in each tick the rocket will explode
  }

  constructor() {}

  ngOnInit() {   
    this.container = document.getElementById('fireworks');
    this.fireworks = new Fireworks.start(this.container, this.options)
  }

}

