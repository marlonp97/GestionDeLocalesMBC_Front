import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioLogin } from 'src/app/model/usuario-login.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = {
    correo: "",
    clave: ""
  };

  constructor(private router: Router, private usuarioService: UsuarioService, private messageService: MessageService) { }

  login() {

    this.usuarioService.login(this.usuarioLogin).subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Guardar información del usuario en el localStorage
            localStorage.setItem("idUsuario", String(data.body.idUsuario));
            localStorage.setItem("nombre", data.body.nombre);
            localStorage.setItem("apellido", data.body.apellido);
            localStorage.setItem("correo", data.body.correo);
            localStorage.setItem("telefono", data.body.telefono);
            localStorage.setItem("rolUsuario", data.body.rolUsuario);
            localStorage.setItem("empresa", data.body.empresa);

            if(data.body.rolUsuario == "Admin") {

              this.router.navigate(['admin']);

            } else if(data.body.rolUsuario == "Cliente") {

              this.router.navigate(['cliente']);

            }

          }

        } else {

          this.messageService.add({key: 'loginToast', severity:'error', summary: 'Error', detail: 'Error al hacer login'});

        }

      }, error => {

        if(error.status == 401) {

          this.messageService.add({key: 'loginToast', severity:'error', summary: 'Error', detail: 'Error al hacer login, verifique los datos ingresados'});

        } else if(error.status == 400) {

          this.messageService.add({key: 'loginToast', severity:'error', summary: 'Error', detail: 'Error al hacer login'});

        } else {

          this.messageService.add({key: 'loginToast', severity:'error', summary: 'Error', detail: 'Error al hacer login'});

        }

        localStorage.clear();

      }

    )

  }

  ngOnInit(): void {

    localStorage.clear();

  }

}