import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Personaje } from '@app/shared/components/interfaces/info_personajes';
import { PersonajeService } from '@app/shared/services/personaje.service';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.scss']
})
export class ListaPersonajesComponent implements OnInit {
  personajes: Personaje[] = [];
  displayedColumns: string[] = ['imagen', 'nombre', 'especie', 'estado', 'ubicacion'];

  totalPersonajes = 0;        // count total que devuelve la API (info.count)
  pageSize = 20;              // valor inicial (puedes poner 5, 10 o 20)
  pageIndex = 0;              // índice de la "subpágina" en mat-paginator (base 0)
  query!: string;

  // caché de páginas API: key = número de página de la API (1..N), value = resultados (array)
  private apiPageCache = new Map<number, Personaje[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private personajeService: PersonajeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // 👇 Escuchar SIEMPRE los cambios en queryParams
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.pageIndex = 0; // cuando hay nueva búsqueda, reiniciamos paginador
      this.loadData();
    });

    // Si entras sin queryParams, igual cargamos los datos
    this.loadData();
  }

    loadData(): void {
    this.personajeService
      .getPersonajesSubPage(this.pageIndex, this.pageSize, this.query)
      .subscribe(res => {
        this.personajes = res.personajes;
        this.totalPersonajes = res.total;
      });
  }

  /**
   * Evento del paginador (pageIndex base 0, pageSize)
   */
  onPageChange(event: PageEvent): void {
  this.pageSize = Math.min(event.pageSize, 20);
  this.pageIndex = event.pageIndex;
  this.loadData();
}



  volver(): void {
    this.location.back();
  }
}
