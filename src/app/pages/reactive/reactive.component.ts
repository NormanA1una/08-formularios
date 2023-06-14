import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService,
    private router: Router
  ) {
    this.crearFormulario();

    this.crearDataForm();

    this.crearListeners();
  }

  ngOnInit() {}

  cambiarFormulario() {
    this.router.navigate(['template']);
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return (
      this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
    );
  }

  get apellidoNoValido() {
    return (
      this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
    );
  }

  get correoNoValido() {
    return (
      this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
    );
  }

  get usuarioNoValido() {
    return (
      this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
    );
  }

  get distritoNoValido() {
    return (
      this.forma.get('direccion.distrito')?.invalid &&
      this.forma.get('direccion.distrito')?.touched
    );
  }

  get ciudadNoValido() {
    return (
      this.forma.get('direccion.ciudad')?.invalid &&
      this.forma.get('direccion.ciudad')?.touched
    );
  }

  get pass1NoValida() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }

  get pass2NoValida() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return pass1 === pass2 ? false : true;
  }

  crearFormulario() {
    this.forma = this.fb.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            this.validadores.noNorman,
          ],
        ],
        apellido: ['', [Validators.required, Validators.minLength(5)]],
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        usuario: ['', , this.validadores.existeUsuario],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        direccion: this.fb.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required],
        }),
        pasatiempos: this.fb.array([]),
      },
      {
        validators: [this.validadores.passwordIguales('pass1', 'pass2')],
      } as AbstractControlOptions
    );
  }

  crearListeners() {
    /* this.forma.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.forma.statusChanges.subscribe((status) => {
      console.log(status);
    }); */

    this.forma.get('nombre')?.valueChanges.subscribe(console.log);
  }

  crearDataForm() {
    this.forma.reset({
      nombre: 'Norman',
      apellido: 'Aranda',
      correo: 'normanluna32@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Managua',
        ciudad: 'Managua',
      },
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(
      this.fb.control('Nuevo Elemento', Validators.required)
    );
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((controls) =>
            controls.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(this.forma.value);

    this.forma.reset();
  }
}
