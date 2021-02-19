import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { GameBoyComponent } from './components/game-boy/game-boy.component';
import { ScreenComponent } from './components/game-boy/screen/screen.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import { PokemonService } from './services/pokemon.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GameBoyComponent,
    ScreenComponent,
    PokeListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
