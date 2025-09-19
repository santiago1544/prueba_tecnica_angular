import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewToggleService } from '@shared/services/view-toggle.service';

@Component({
  selector: 'app-buscador',
  template: `
    <input
  #inputSearch
  autofocus
  type="text"
  class="form-control-lg"
  [placeholder]="
    currentView === 'personajes' ? 'Buscar Personaje' : 'Buscar Pokémon'
  "
  (keyup)="onSearch(inputSearch.value)"
/>
  `,
  styles: ['input {width:100%;}'],
})
export class BuscadorComponent implements OnInit {
  public currentView: 'personajes' | 'pokemones' = 'personajes';

  constructor(
    private router: Router,
    private viewToggleService: ViewToggleService
  ) {}

  ngOnInit(): void {
    // Nos suscribimos a los cambios del toggle
    this.viewToggleService.currentView$.subscribe((view) => {
      this.currentView = view;
    });
  }

  onSearch(value: string) {
    if (value && value.length > 1) {
      if (this.currentView === 'personajes') {
        this.router.navigate(['/lista_personajes'], {
          queryParams: { q: value },
        });
      } else if (this.currentView === 'pokemones') {
        this.router.navigate(['/lista_pokemones'], {
          queryParams: { q: value },
        });
      }
    }

<<<<<<< HEAD
    if (value && value.length <= 1) {
=======
    if (value && value.length <= 1) { //Condicion para que la página vuelva a su estado original luego de borrar los datos de la barra de busqueda
>>>>>>> a6cf278e4849fc5ec0251e310f1adb1cf14e833e
      this.router.navigate(['/']);
    }
  }
}
