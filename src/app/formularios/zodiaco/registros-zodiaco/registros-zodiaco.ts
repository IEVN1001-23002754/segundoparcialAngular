import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Izodiaco } from '../izodiaco';

@Component({
  selector: 'app-registros-zodiaco',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registros-zodiaco.html',
  styleUrl: './registros-zodiaco.css'
})

export class RegistrosZodiaco implements OnInit 
{
  formulario!: FormGroup;
  registros: Izodiaco[] = [];
  indiceEdicion: number = -1;

  ngOnInit(): void 
  {
    this.cargarRegistros();
    this.formulario = new FormGroup({
      nombreCompleto: new FormControl(''),
      sexo: new FormControl(''),
      edad: new FormControl(''),
      signo: new FormControl('')
    });
  }

  cargarRegistros(): void 
  {
    const datos = localStorage.getItem('registros');
    if (datos) {
      this.registros = JSON.parse(datos);
    }
  }

  editarRegistro(index: number): void 
  {
    const registro = this.registros[index];
    
    const nombreCompleto = [registro.nombre, registro.aPaterno, registro.aMaterno]
      .filter(Boolean)
      .join(' ');

    this.formulario.patchValue({
      nombreCompleto: nombreCompleto,
      sexo: registro.sexo,
      edad: registro.edad || '',
      signo: registro.signo || ''
    });

    this.indiceEdicion = index;
  }

  guardarEdicion(): void 
  {
    if (this.indiceEdicion >= 0) {
      const valorNombreCompleto = (this.formulario.value.nombreCompleto || '').trim();
      
      const partes = valorNombreCompleto.split(/\s+/);

      let nombre = '';
      let aPaterno = '';
      let aMaterno = '';

      if (partes.length === 1) 
      {
        nombre = partes[0];
      } 
      else if (partes.length === 2) 
      {
        nombre = partes[0];
        aPaterno = partes[1];
      } 
      else if (partes.length === 3) 
      {
        nombre = partes[0];
        aPaterno = partes[1];
        aMaterno = partes[2];
      } 
      else if (partes.length >= 4) 
      {
        aMaterno = partes.pop() || '';
        aPaterno = partes.pop() || '';
        nombre = partes.join(' ');
      }

      this.registros[this.indiceEdicion] = 
      {
        ...this.registros[this.indiceEdicion],
        nombre: nombre,
        aPaterno: aPaterno,
        aMaterno: aMaterno,
        sexo: this.formulario.value.sexo,
        edad: this.formulario.value.edad,
        signo: this.formulario.value.signo
      };

      localStorage.setItem('registros', JSON.stringify(this.registros));
      this.formulario.reset();
      this.indiceEdicion = -1;
      alert('Registro actualizado exitosamente');
    } 
    else 
    {
      alert('Seleccione un registro para editar');
    }
  }

  eliminarRegistro(index: number): void 
  {
    this.registros.splice(index, 1);
    localStorage.setItem('registros', JSON.stringify(this.registros));

    if (this.indiceEdicion === index) {
      this.formulario.reset();
      this.indiceEdicion = -1;
    }
  }
}