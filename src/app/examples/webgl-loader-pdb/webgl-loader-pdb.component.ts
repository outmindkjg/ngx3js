import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-loader-pdb',
  templateUrl: './webgl-loader-pdb.component.html',
  styleUrls: ['./webgl-loader-pdb.component.scss']
})
export class WebglLoaderPdbComponent extends BaseComponent<{
  molecule : string
}> {

  constructor() {
    super({
      molecule : 'Caffeine'
    },[
      { name : 'molecule', type : 'select', select : [
        "Ethanol",
        "Aspirin",
        "Caffeine",
        "Nicotine",
        "LSD",
        "Cocaine",
        "Cholesterol",
        "Lycopene",
        "Glucose",
        "Aluminium oxide",
        "Cubane",
        "Copper",
        "Fluorite",
        "Salt",
        "YBCO superconductor",
        "Buckyball",
        "Graphite"
      ], change : () => {
        this.setMolecule(this.controls.molecule);
      }}
    ]);
  }

  ngOnInit() {
    this.setMolecule(this.controls.molecule);
  }

  setMolecule(name : string) {
    if (this.MOLECULES[name] !== null && this.MOLECULES[name] !== undefined) {
      this.selectedMolecule = 'models/pdb/' + this.MOLECULES[name];    
    }
  }
  selectedMolecule : string = null;

  MOLECULES = {
    "Ethanol": "ethanol.pdb",
    "Aspirin": "aspirin.pdb",
    "Caffeine": "caffeine.pdb",
    "Nicotine": "nicotine.pdb",
    "LSD": "lsd.pdb",
    "Cocaine": "cocaine.pdb",
    "Cholesterol": "cholesterol.pdb",
    "Lycopene": "lycopene.pdb",
    "Glucose": "glucose.pdb",
    "Aluminium oxide": "Al2O3.pdb",
    "Cubane": "cubane.pdb",
    "Copper": "cu.pdb",
    "Fluorite": "caf2.pdb",
    "Salt": "nacl.pdb",
    "YBCO superconductor": "ybco.pdb",
    "Buckyball": "buckyball.pdb",
    "Graphite": "graphite.pdb"
  };

}
