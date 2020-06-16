import { Plugins } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';

const Storage = Plugins.Storage;

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  noticias: Article[] = [];
  enFavorito: boolean = false;

  constructor() {
    this.cargarFavorito();
  }

  async guardarNoticia(noticia: Article) {
    // .find() busca una concurrencia dentro del arreglo segun la condicion que  colocamos
    const existe = this.noticias.find(
      (noti: Article) => noti.title === noticia.title
    );

    // filtrar los duplicados
    if (!existe) {
      // se guarda la noticia en el arreglo
      this.noticias.unshift(noticia);

      // se  guarda el arrglo en local como un json strings
      await Storage.set({
        key: 'favoritos',
        value: JSON.stringify(this.noticias),
      });
    }
  }

  async cargarFavorito() {
    let data = await Storage.get({ key: 'favoritos' });
    let favoritos = JSON.parse(data.value);

    // validar  si existen favoritos
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  async borrarFavorito(noticia: Article) {
    this.noticias = this.noticias.filter(
      (noti) => noti.title !== noticia.title
    );

    if (this.noticias.length > 0) {
      await Storage.set({
        key: 'favoritos',
        value: JSON.stringify(this.noticias),
      });
    } else {
      this.noticias = [];
    }
  }
}
