import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../components/interfaces/info_pokemon';
import { environment1 } from '@environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  // Lista de pokemones
  getAllPokemons(): Observable<any> {
    return this.http.get<any>(`${environment1.urlAPI}?limit=10000&offset=0`);
  }

getAllPokemonsShuffled(): Observable<{ results: { name: string, url: string }[], total: number }> {
  return this.http.get<{ count: number, results: { name: string, url: string }[] }>(
    `${environment1.urlAPI}?limit=10000&offset=0`
  ).pipe(
    map((res) => {
      // Mezclar resultados
      const shuffled = [...res.results].sort(() => Math.random() - 0.5);
      return { results: shuffled, total: res.count };
    })
  );
}



  // Detalle de un pokemon por id o nombre
  getPokemon(id: number | string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment1.urlAPI}/${id}`);
  }

    getPokemonByUrl(url: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(url);
    }
}
