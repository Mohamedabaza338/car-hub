import { Component, OnInit } from '@angular/core';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  loading:boolean=false;
  total = 100;
  page: any = 1;
  messagesArr: any[] =[]; 
  limit: number = 10;



  
  constructor(private sharedService:SharedHttpService) {
    
  }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.loading = true;  
    if(this.page==0){
      this.page=1;
    }
    this.sharedService.get(`api/ContactUs/GetAllContactUs`).subscribe((res)=>{
      this.messagesArr=res
      this.total=res.length;
      this.loading=false;
    })
  }
  changePage(page: any) {
    this.page = page;
    this.loaddata();
  }

}
