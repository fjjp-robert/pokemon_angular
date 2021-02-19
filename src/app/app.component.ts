import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokemon';

  couleursDispo: string[] = ['bleu', 'jaune'];
  selectedColor: string = 'bleu';

  loading:boolean=true;


  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {

    this.pokemonService.getNPokemonsFromApi(151).then(
      () => {
        this.loading = false;
      }
    );
  }

  /** changement de couleur */
  onColorChange(event): void {
    this.selectedColor = event.target.value;
  }
}
