import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit, OnDestroy {

  pokemonOnScreen:Pokemon;
  pokemonOnScreenSubscription:Subscription;
  pokemonsSubscription:Subscription;
  nbPokemonsCaptures:number;
  nbPokemonsTotal:number;

  constructor(private pokemonService:PokemonService) {

  }

  ngOnInit(): void {
    this.pokemonOnScreenSubscription = this.pokemonService.pokemonOnScreenSubject.subscribe(
      (pokemon) => {
        this.pokemonOnScreen = pokemon;
      }
    );
    this.pokemonsSubscription = this.pokemonService.pokemonsSubject.subscribe(
      (pokemons) => {
        this.nbPokemonsCaptures = pokemons.filter(pokemon => pokemon.isCaught).length;
        this.nbPokemonsTotal = pokemons.length;
      }
    );
  }

  ngOnDestroy(): void {
    this.pokemonOnScreenSubscription.unsubscribe();
    this.pokemonsSubscription.unsubscribe();
  }

  getNbTentativesTotal(): number {
    return this.pokemonService.getNbTentatives();
  }
}
