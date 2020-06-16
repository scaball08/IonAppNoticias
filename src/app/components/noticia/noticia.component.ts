import { DataLocalService } from './../../services/data-local.service';
import { Article } from './../../interfaces/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ActionSheetController, ToastController } from '@ionic/angular';

const Browser = Plugins.Browser;
const Share = Plugins.Share;

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() index: number;

  constructor(
    private actionSheetController: ActionSheetController,
    private dataLocalService: DataLocalService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async abrirNoticia() {
    console.log('URL Noticia', this.noticia.url);
    await Browser.open({ url: this.noticia.url });
  }

  async lanzarMenu() {
    const actionSheet = await this.actionSheetController.create({
      backdropDismiss: false,
      buttons: [
        {
          text: this.dataLocalService.enFavorito
            ? 'Eliminar Favorito'
            : 'Favorito',
          cssClass: 'action-dark',
          icon: this.dataLocalService.enFavorito ? 'trash-outline' : 'star',
          handler: () => {
            console.log('Favorito Clicked');

            this.dataLocalService.enFavorito
              ? this.dataLocalService.borrarFavorito(this.noticia)
              : this.dataLocalService.guardarNoticia(this.noticia);

            this.presentarToast();
          },
        },
        {
          text: 'Compartir',
          cssClass: 'action-dark',
          icon: 'share-social',
          handler: async () => {
            console.log('Compartir Clicked');

            let compartido = await Share.share({
              dialogTitle: this.noticia.content,
              text: this.noticia.source.name,
              title: this.noticia.title,
              url: this.noticia.url,
            });
          },
        },
        {
          text: 'Cancelar',
          cssClass: 'action-dark',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar Clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async presentarToast() {
    let mensaje = this.dataLocalService.enFavorito
      ? 'Eliminado de Favoritos'
      : 'Agregado a Favoritos';
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });

    toast.present();
  }
}
