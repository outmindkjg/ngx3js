import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import { LocalStorageService } from '../../three/local-storage.service';

@Component({
  selector: 'app-misc-exporter-obj',
  templateUrl: './misc-exporter-obj.component.html',
  styleUrls: ['./misc-exporter-obj.component.scss']
})
export class MiscExporterObjComponent extends BaseComponent<{
  type : string,
  export : () => void
}> {

  constructor(private localStorageService : LocalStorageService) {
    super({
      type : 'triangle',
      export : () => {
        if (this.scene !== null) {
          window['scene'] = this.scene.getScene();
          this.localStorageService.getExportObject('scene.obj', this.scene.getScene());
        }
      }
    },[
      { name : 'type', type : 'select', select : ['triangle', 'cube','cylinder', 'multiple','transformed', 'points']},
      { name : 'export' , title : 'Export to OBJ', type : 'button'}
    ]);
  }

  vertices : number[] = [- 50, - 50, 0, 50, - 50, 0, 50, 50, 0];
  points = [ 0, 0, 0, 100, 0, 0, 100, 100, 0, 0, 100, 0 ];
  colors = [ 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0 ];

}
