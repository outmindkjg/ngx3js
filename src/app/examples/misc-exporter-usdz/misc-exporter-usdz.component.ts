import { Component } from '@angular/core';
import { BaseComponent, LocalStorageService } from 'ngx3js';

@Component({
  selector: 'app-misc-exporter-usdz',
  templateUrl: './misc-exporter-usdz.component.html',
  styleUrls: ['./misc-exporter-usdz.component.scss']
})
export class MiscExporterUsdzComponent extends BaseComponent<{
  downloadUsdz : () => void
}> {

  constructor(private localStorageService : LocalStorageService) {
    super({
      downloadUsdz : () => {
        this.localStorageService.getExportObject('asset.usdz', this.scene.getScene());
      }
    },[
      { name : 'downloadUsdz', title : 'export Usdz' , type : 'button'}
    ]);
  }

}
