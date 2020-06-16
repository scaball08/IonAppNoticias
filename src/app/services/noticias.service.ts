import { RespuestaTopHeadLines } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-Key': apiKey,
});

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  headLinesPage = 0;
  categoryPage = {
    business: 0,
    entertainment: 0,
    general: 0,
    health: 0,
    science: 0,
    sports: 0,
    technology: 0,
  };
  constructor(private httpClient: HttpClient) {}

  // usando tipos genericos
  // cuando es llamada la funcion se coloca el tipo de datos que retornara
  // La funcion recivira un tipo generico que sera el mismo a retornar
  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;

    // se retorna el mismo tipo de datos generico
    return this.httpClient.get<T>(query, {
      headers: headers,
    });
  }

  getTopHeadLines() {
    this.headLinesPage++;
    // Forma 1
    // return this.httpClient.get<RespuestaTopHeadLines>(
    //   `http://newsapi.org/v2/top-headlines?country=us&apiKey=01329253bda341708972887fb192c059`
    // );

    // Forma 2
    return this.ejecutarQuery<RespuestaTopHeadLines>(
      `/top-headlines?country=us&page=${this.headLinesPage}`
    );
  }

  getTopHeadLinesCategoria(categoria: string) {
    this.categoryPage[categoria] += 1;
    console.log('nombreCategoriaActual: ', categoria);
    console.log('contadorCategoria:', this.categoryPage[categoria]);
    return this.ejecutarQuery<RespuestaTopHeadLines>(
      `/top-headlines?country=us&category=${categoria}&page=${this.categoryPage[categoria]}`
    );
  }
}
