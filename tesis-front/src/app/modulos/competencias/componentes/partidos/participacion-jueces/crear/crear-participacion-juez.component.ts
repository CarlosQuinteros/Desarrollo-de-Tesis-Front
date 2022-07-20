import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JuezRolDto } from 'src/app/core/Dtos/participaciones-jueces/juez-rol-dto';
import { Juez } from 'src/app/core/modelo/juez';
import { JuezRolPartidoService } from 'src/app/servicios/juez-rol-partido.service';
import { JuezService } from 'src/app/servicios/juez.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-participacion-juez',
  templateUrl: './crear-participacion-juez.component.html',
  styleUrls: ['./crear-participacion-juez.component.css']
})
export class CrearParticipacionJuezComponent implements OnInit {

  idPartido : number = 0;
  roles: string[] = [];
  dniOLegajo :string = '';
  juez : Juez = new Juez(0,'','','','');
  juezRolDto : JuezRolDto = new JuezRolDto(0,0,'');

  constructor(
    private juezService: JuezService,
    private juezRolPartidoService : JuezRolPartidoService,
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.idPartido = parseInt(this.config.data.idPartido);    
    this.obtenerRoles();
    
  }

  obtenerRoles(): void {
    this.juezService.listadoNombreRolJuez().subscribe(
      data => {
        this.roles = data;
      }
    )
  }

  obtenerJuez(): void {
    this.juezService.detalleJuezPorDniOLegajo(this.dniOLegajo).toPromise().then(
      data => {
        this.juez = data;
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
          target:'#bodyJuez',
        })
      }
    )
  }

  crearParticipacionJuez(): void {
    let nuevaParticipacion :JuezRolDto = {...this.juezRolDto};
    nuevaParticipacion.idJuez = this.juez.id;
    nuevaParticipacion.idPartido = this.idPartido;
    //console.log(nuevaParticipacion);
    this.solicitarCreacionJuezRolPartido(nuevaParticipacion);   
    
  }

  solicitarCreacionJuezRolPartido(nuevaParticipacion :JuezRolDto):void {
    this.juezRolPartidoService.crearParticipacionJuez(nuevaParticipacion).toPromise().then(
      data => {
        this.ref.close();
        Swal.fire(data.mensaje,'', 'success');
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
          target:'#bodyJuez',
        })
      }
    )
  }

}
