import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Norman',
    apellido: 'Aranda',
    email: 'normanluna32@gmail.com',
    pais: 'NIC',
    genero: 'M',
  };

  //llamado al servicio de paises
  paisesSelect: any[] = [];

  constructor(private paisService: PaisService, private router: Router) {}

  ngOnInit() {
    this.paisService.getPaises().subscribe((paises) => {
      this.paisesSelect = paises;

      this.paisesSelect.unshift({
        nombre: '[Selecione un País]',
        codigo: '',
      });

      //console.log(paises);
    });
  }

  cambiarFormulario() {
    this.router.navigate(['reactive']);
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
