import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-game-boy',
  templateUrl: './game-boy.component.html',
  styleUrls: ['./game-boy.component.scss']
})
export class GameBoyComponent implements OnInit, OnDestroy {

  // on déclare la couleur comme attribut d'entrée, 
  // afin de pouvoir appliquer la casse correspondante
  @Input() selectedColor: string;

  pokemonOnScreen:Pokemon;
  pokemonOnScreenScubscription:Subscription;

  constructor(private pokemonService:PokemonService) {

  }
  
 
  ngOnInit(): void {
    this.pokemonOnScreenScubscription = this.pokemonService.pokemonOnScreenSubject.subscribe(
      (pokemon) => {
        this.pokemonOnScreen = pokemon;
      }
    )
  }

  ngOnDestroy(): void {
    this.pokemonOnScreenScubscription.unsubscribe();
  }

  onClickA() {
    this.pokemonService.attemptCatchPokemon(this.pokemonOnScreen);
  }

  onClickB() {
    this.pokemonService.getPokemonToShow();
  }

  onClickStart() {

  }

  onClickSelect() {

  }
}
