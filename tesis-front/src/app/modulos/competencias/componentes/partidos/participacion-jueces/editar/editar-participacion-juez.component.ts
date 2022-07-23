import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JuezRolDto } from 'src/app/core/Dtos/participaciones-jueces/juez-rol-dto';
import { Juez } from 'src/app/core/modelo/juez';
import { JuezRol } from 'src/app/core/modelo/juez-rol';
import { JuezRolPartidoService } from 'src/app/servicios/juez-rol-partido.service';
import { JuezService } from 'src/app/servicios/juez.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editar-participacion-juez',
  templateUrl: './editar-participacion-juez.component.html',
  styleUrls: ['./editar-participacion-juez.component.css']
})
export class EditarParticipacionJuezComponent implements OnInit {
  idPartido : number = 0;
  roles: string[] = [];
  dniOLegajo :string = '';
  juez : Juez = new Juez(0,'','','','');
  juezRolDto : JuezRolDto = new JuezRolDto(0,0,'');
  blockSpace: RegExp = /[^\s]/;

  constructor(
    private juezService: JuezService,
    private juezRolPartidoService : JuezRolPartidoService,
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
    const participacion : JuezRol = this.config.data.participacionJuez;
    this.dniOLegajo = participacion.juez.documento;
    this.juezRolDto.idPartido = participacion.partido.id; 
    this.juezRolDto.idJuez = participacion.juez.id;
    this.juezRolDto.rol = participacion.rol;
    this.juez = {...participacion.juez}; 
    //console.log(this.juezRolDto);
    
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

  editarParticipacion(): void {
    let editarParticipacion :JuezRolDto = {...this.juezRolDto};
    editarParticipacion.idJuez = this.juez.id;
    console.log(editarParticipacion);
    this.solicitarEdicionJuezRolPartido(editarParticipacion);   
    
  }

  solicitarEdicionJuezRolPartido(editarParticipacion :JuezRolDto):void {
    const idParticipacion :number = this.config.data.participacionJuez.id;
    
    this.juezRolPartidoService.editarParticipacionJuez(editarParticipacion, idParticipacion).toPromise().then(
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
