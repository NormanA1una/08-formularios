import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
  };

  constructor(private paisService: PaisService) {}

  ngOnInit() {
    this.paisService.getPaises().subscribe((paises) => {
      console.log(paises);
    });
  }

  guardar(forma: NgForm) {
    console.log(forma);

    if (forma.invalid) {
      Object.values(forma.controls).forEach((controls) => {
        controls.markAsTouched();
      });

      return;
    }
    console.log(forma.value);
  }
}
