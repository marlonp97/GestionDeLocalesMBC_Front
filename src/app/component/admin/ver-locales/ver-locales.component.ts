import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Local } from 'src/app/model/local.model';
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-ver-locales',
  templateUrl: './ver-locales.component.html',
  styleUrls: ['./ver-locales.component.css'],
  providers: [MessageService]
})
export class VerLocalesComponent implements OnInit {

  locales: Local[] = [];

  constructor(private localService: LocalService, private messageService: MessageService) { }

  getAllLocales() {

    this.localService.getAllLocales().subscribe(

      data => {

        if(data.status == 200) {

          if(data.body) {

            // Mostrar tabla de locales
            this.locales = data.body;

          }

        } else {

          this.messageService.add({key: 'verLocalesToast', severity:'error', summary: 'Error', detail: 'Error al cargar los locales'});

        }

      }, error => {

        if(error.status == 400) {

          this.messageService.add({key: 'verLocalesToast', severity:'error', summary: 'Error', detail: 'Error al cargar los locales'});

        } else {

          this.messageService.add({key: 'verLocalesToast', severity:'error', summary: 'Error', detail: 'Error al cargar los locales'});

        }

      }
      
    );

  }

  ngOnInit(): void {

    this.getAllLocales();

  }

}
