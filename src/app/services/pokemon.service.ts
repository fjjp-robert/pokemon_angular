import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable()
export class PokemonService {

  /**
   * Déclaration des attributs et des subjects pour les émettre
   */
  pokemons: Pokemon[] = [];
  pokemonsSubject = new Subject<Pokemon[]>();

  pokemonOnScreen: Pokemon;
  pokemonOnScreenSubject = new Subject<Pokemon>();

  tentativesCaptures: number = 0;
  tentativesCapturesSubject = new Subject<number>();

  /**
   * Constructeur
   */
  constructor() { }

  /**
   * Méthodes d'émission
   */
  emitPokemons(): void {
    this.pokemonsSubject.next(this.pokemons);
  }

  emitPokemonOnScreen(): void {
    this.pokemonOnScreenSubject.next(this.pokemonOnScreen);
  }

  emitTentativesCaptures(): void {
    this.tentativesCapturesSubject.next(this.tentativesCaptures);
  }

  /**
   * Méthodes exposées
   */
  getPokemonToShow(): void {
    const uncaughtPokemons = this.pokemons.filter(pokemon => !pokemon.isCaught);

    const random = Math.floor(Math.random() * uncaughtPokemons.length)
    const onScreen = uncaughtPokemons[random]
    this.pokemonOnScreen = onScreen;
    this.emitPokemonOnScreen();
  }

  getNPokemonsFromApi(nbPokemonsACharger: number) {

    const urls = [];
    for (let i = 1; i <= nbPokemonsACharger; i++) {
      urls.push(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    }
    const requests = urls.map(url => fetch(url));
    return Promise.all(requests)
      .then(reponses => Promise.all(reponses.map(res => res.json())))
      .then(pokemons => pokemons.map(pokemon => new Pokemon(
        pokemon.id,
        pokemon.names[4].name,
        pokemon.capture_rate,
        false,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`)
      )).then(
        (pokemons: Pokemon[]) => {
          this.pokemons = pokemons;
          this.emitPokemons();
        }
      );
  }

  attemptCatchPokemon(pokemon: Pokemon):void {
    if (pokemon) {
      // on incrémente le compteur
      this.tentativesCaptures+=1;
      // 255 car taux de capture c'est un nombre entre 0 et 255
      const random = Math.floor(Math.random()*255)

      // on le récupère dans la liste pour le modifier directement
      let pokemonToCatch = this.pokemons.find(
        (pokemonElem) => {
          return pokemonElem.id === pokemon.id;
        }
      )
      // le pokémon est capturé si le random calculé + sopn taux de capture est >= 255
      const resultatCapture = (random + pokemon.captureRate) >= 255;
      // on fait le || pour ne pas changer l'état de capture s'il était déjà capturé
      pokemonToCatch.isCaught = (pokemon.isCaught || resultatCapture);

      this.emitPokemons();
      this.emitTentativesCaptures();
    } else {
      console.log('capture mais avec aucun pokemon affiché')
    }
  }

  getNbTentatives(): number {
    return this.tentativesCaptures;
  }
}
