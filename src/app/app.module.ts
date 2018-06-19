import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { SelectComponent } from './select/select.component';
import { PlayersComponent } from './players/players.component';
import { FireworksComponent } from './fireworks/fireworks.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    SelectComponent,
    PlayersComponent,
    FireworksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
