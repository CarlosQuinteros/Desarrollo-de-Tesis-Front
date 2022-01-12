import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevoClubDto } from 'src/app/Dtos/clubes/club-dto';
import { Club } from 'src/app/modelo/club';
import { ClubService } from 'src/app/servicios/club.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-club',
  templateUrl: './editar-club.component.html',
  styleUrls: ['./editar-club.component.css']
})
export class EditarClubComponent implements OnInit {

  club : Club = new Club('','','');
  msj : string = '';
  patron: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]{0,254}"
  clubEditar : NuevoClubDto = new NuevoClubDto();


  constructor(
    private router: Router,
    private clubService: ClubService,
    private rutaActiva : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.rutaActiva.snapshot.params.id;
    this.obtenerClub(id);
    
  }

   obtenerClub(id: number): void {
   this.clubService.detalleClub(id).toPromise().then(
      data => {
        this.club = data;
        
      },err => {
        this.router.navigate(['/clubes/lista']);
        this.msj = err.error.message;
        Swal.fire('Error', this.msj,'error');
      }
    )
  }

  editarClub(id: number): void {
    Swal.fire({
      title: '¿Realmente deseas editar el Club?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Editar',
      icon: 'question'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarActualizacionClub(id);
      }
    })

  }

  async solicitarActualizacionClub(id: number): Promise<void> {
    this.clubEditar.nombre = this.club.nombreClub;
    this.clubEditar.alias = this.club.alias;
    this.clubEditar.email = this.club.email;
    await this.clubService.editarClub(this.clubEditar, id).subscribe(
      data => {
        this.club = data.club;
        this.msj = data.mensaje;
        Swal.fire(this.msj, '', 'success');
      },err => {
        this.msj = err.error.message;
        Swal.fire('Error al editar', this.msj, 'error');
      }
    )
  }

}
