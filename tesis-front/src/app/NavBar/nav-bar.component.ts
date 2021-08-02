import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../servicios/token.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  nombreUsuario: any;
  constructor(private tokenService : TokenService, private router: Router) {}

  ngOnInit(): void {
    if(this.tokenService.getToken()) {
      this.nombreUsuario = this.tokenService.getUserNamme();
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
    Swal.fire({
      icon: 'success',
      title: 'Cerraste Sesion correctamente!'
    })

  }

}
