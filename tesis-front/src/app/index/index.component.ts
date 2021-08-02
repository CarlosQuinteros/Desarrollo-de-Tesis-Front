import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  roles : string[] = [];

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    
    if(this.tokenService.getToken()){
      this.roles = this.tokenService.getAuthorities();
    }
    else{
      this.router.navigate(['/login']);
    }
  }


}
