import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  categorias: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  noticias: Article[] = [];
  categoriaActual: string = this.categorias[0];
  @ViewChild('segmento', { static: false }) segment: IonSegment;

  @ViewChild('inScroll', { static: false }) newsScroll: IonInfiniteScroll;

  constructor(private noticiasService: NoticiasService) {}
  ngOnInit(): void {
    this.cargarNoticia(this.categorias[0]);
  }

  cambiarCategoria(event) {
    this.noticias = [];
    this.categoriaActual = event.detail.value;
    this.noticiasService.categoryPage[this.categoriaActual] = 0;
    this.newsScroll.disabled = false;
    this.cargarNoticia(this.categoriaActual);
  }
  cargarNoticia(categoria: string, event?) {
    this.noticiasService
      .getTopHeadLinesCategoria(categoria)
      .subscribe((resp) => {
        this.noticias.push(...resp.articles);
        if (event) {
          event.target.complete();
          if (resp.articles.length === 0) {
            this.newsScroll.disabled = true;
          }
        }
      });
  }

  loadData(event) {
    this.cargarNoticia(this.categoriaActual, event);
  }
}
