import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoClubDto } from 'src/app/Dtos/clubes/club-dto';
import { Club } from 'src/app/modelo/club';
import { ClubService } from 'src/app/servicios/club.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-club',
  templateUrl: './nuevo-club.component.html',
  styleUrls: ['./nuevo-club.component.css']
})
export class NuevoClubComponent implements OnInit {

  //patron: string = '^[a-zA-Z-ÿ\u00f1\u00d1\u00E0-\u00FC ]{2,254}';
  //patron: string = "^[a-zA-Z \u00f1\u00d1\u00E0-\u00FC]{0,254}";
  //patron: string = "^[a-z A-Z \u00f1\u00d1\u00E0-\u00FC\u00C0-\u017F]+$"
  //patron: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  // cambio el + por * 
  patron: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  
  nuevoClub : NuevoClubDto = new NuevoClubDto();
  mensaje : string = '';

  constructor(private router: Router, private clubService: ClubService) { }

  ngOnInit(): void {
      
  }

  crearNuevoClub(form: NgForm){
    //console.log(this.nuevoClub);
    Swal.fire({
      title:'¿Crear un Club nuevo?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitarCreacionClub(form)
      }
    });
  }

  solicitarCreacionClub(form: NgForm){
    this.clubService.crearClub(this.nuevoClub).subscribe(
      data => {
        this.mensaje = data.mensaje;
        Swal.fire(this.mensaje, '', 'success');
        form.resetForm();
      },
      err => {
        this.mensaje = err.error.message;
        Swal.fire("Error al crear el Club",this.mensaje, 'error');
      }
    )
  }

}
