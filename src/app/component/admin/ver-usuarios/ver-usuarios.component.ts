import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css'],
  providers: [MessageService]
})
export class VerUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private messageService: MessageService) { }

  getAllUsuarios() {

    this.usuarioService.getAllUsuarios().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Mostrar tabla de usuarios
            this.usuarios = data.body;

          }

        } else {

          this.messageService.add({key: 'verUsuariosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los usuarios'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verUsuariosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los usuarios'});

        } else {

          this.messageService.add({key: 'verUsuariosToast', severity:'error', summary: 'Error', detail: 'Error al cargar los usuarios'});

        }

      }
      
    );

  }

  ngOnInit(): void {

    this.getAllUsuarios();

  }

}