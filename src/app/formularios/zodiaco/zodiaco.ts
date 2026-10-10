import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Izodiaco } from './izodiaco';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css',
})

export class Zodiaco implements OnInit 
{
  formulario!: FormGroup;
  
  zodiacoDatos: Izodiaco = 
  {
    nombre: '',
    aPaterno: '',
    aMaterno: '',
    dia: '',
    mes: '',
    anio: '',
    sexo: ''
  };

  signoChino: string = '';
  imagenSigno: string = '';
  edad: number = 0;
  enviado: boolean = false;
  imagenDefault: string = 'https://confuciomag.com/wp-content/uploads/2019/01/52_anyo_nuevo_chino_cerdo_08.jpg';

  ngOnInit(): void 
  {
    this.formulario = new FormGroup
    ({
      nombre: new FormControl(''),
      aPaterno: new FormControl(''),
      aMaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl('')
    });

    this.imagenSigno = this.imagenDefault;
  }

  calcularEdad(anioNacimiento: number): number 
  {
    const anioActual = new Date().getFullYear();
    return anioActual - anioNacimiento;
  }

  calcularSignoChino(anio: number): { signo: string, imagen: string } 
  {
    const animales = 
    [
      { signo: 'Rata', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Rata.jpg' },
      { signo: 'Buey', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg' },
      { signo: 'Tigre', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Tigre.jpg' },
      { signo: 'Conejo', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Conejo.jpg' },
      { signo: 'Dragón', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg' },
      { signo: 'Serpiente', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Serpiente.jpg' },
      { signo: 'Caballo', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg' },
      { signo: 'Cabra', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cabra.jpg' },
      { signo: 'Mono', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg' },
      { signo: 'Gallo', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Gallo.jpg' },
      { signo: 'Perro', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Perro.jpg' },
      { signo: 'Cerdo', imagen: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cerdo.jpg' }
    ];

    const index = (anio - 1924) % 12;
    const indiceReal = index < 0 ? index + 12 : index;
    
    return animales[indiceReal];
  }

  procesarFormulario(): void 
  {
    this.zodiacoDatos = 
    {
      nombre: this.formulario.value.nombre,
      aPaterno: this.formulario.value.aPaterno,
      aMaterno: this.formulario.value.aMaterno,
      dia: this.formulario.value.dia,
      mes: this.formulario.value.mes,
      anio: this.formulario.value.anio,
      sexo: this.formulario.value.sexo
    };

    const anioNum = parseInt(this.zodiacoDatos.anio, 10);
    
    if (!isNaN(anioNum)) 
    {
      this.edad = this.calcularEdad(anioNum);
      const resultado = this.calcularSignoChino(anioNum);
      this.signoChino = resultado.signo;
      this.imagenSigno = resultado.imagen;
    } 
    else 
    {
      this.signoChino = 'Desconocido';
      this.edad = 0;
    }

    this.enviado = true;
  }
}