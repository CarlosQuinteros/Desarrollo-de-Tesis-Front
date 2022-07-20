import { Component, Input, OnInit } from '@angular/core';
import { DetalleGeneralPartidoDto } from 'src/app/core/Dtos/partidos/detalle-general-partido-dto';
import { Partido } from 'src/app/core/modelo/partido';
import { PartidosService } from 'src/app/servicios/partidos.service';

@Component({
  selector: 'app-encabezado-partido',
  templateUrl: './encabezado-partido.component.html',
  styleUrls: ['./encabezado-partido.component.css']
})
export class EncabezadoPartidoComponent implements OnInit {

  @Input() partido! : DetalleGeneralPartidoDto
  
  constructor(
    private partidoService: PartidosService
  ) { }

  ngOnInit(): void {    
  }
  
  classPorEstadoPartido(estado:string) : string {
    let estados : {[key: string]: string} = {
      PENDIENTE : 'me-2 bg-orange-200 text-orange-800 text-center',
      FINALIZADO : 'me-2 bg-green-200 text-green-800 text-center',
    }
    return estados[estado];
  }
}
