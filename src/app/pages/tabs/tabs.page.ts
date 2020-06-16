import { DataLocalService } from './../../services/data-local.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private datalocalService: DataLocalService) {}

  tabFavorito(favo) {
    this.datalocalService.enFavorito = favo;
  }
}
