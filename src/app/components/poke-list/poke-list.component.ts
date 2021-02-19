import { Component, OnDestroy, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit, OnDestroy {

  pokemons:Pokemon[];
  pokemonsSubscription:Subscription;
  nbPokemonsCaptures:number;
  nbPokemonsTotal:number;

  nbTentatives:number;
  nbTentativesSubscription:Subscription;

  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.nbTentativesSubscription = this.pokemonService.tentativesCapturesSubject.subscribe(
      (nb) => {
        this.nbTentatives = nb;
      }
    )

    this.pokemonsSubscription = this.pokemonService.pokemonsSubject.subscribe(
      (pokemons:Pokemon[]) => {
        this.pokemons = pokemons;
        this.nbPokemonsCaptures = pokemons.filter(pokemon => pokemon.isCaught).length;
        this.nbPokemonsTotal = pokemons.length;
      }
    )
  }

  ngOnDestroy(): void {
    this.pokemonsSubscription.unsubscribe();
  }

}
