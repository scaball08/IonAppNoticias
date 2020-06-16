import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  @ViewChild('inScroll', { static: false }) inScroll: IonInfiniteScroll;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadLines().subscribe((respuesta) => {
      console.log('noticias', respuesta);

      // this.noticias = respuesta.articles;

      // como el metodo push no acepta un array se usa el operrador spred '...arreglo'
      this.noticias.push(...respuesta.articles);

      if (event) {
        event.target.complete();

        if (respuesta.articles.length === 0) this.inScroll.disabled = true;
      }
    });
  }
}
