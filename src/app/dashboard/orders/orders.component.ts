import { Component, OnInit } from '@angular/core';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  loading:boolean=false;
  total = 100;
  page: any = 1;
  ordersArr: any[] =[]; 
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
    this.sharedService.get(`api/Order/Orders?userId=2a1d69f4-4ddd-46c4-9b8a-5281a5d800d4`).subscribe((res)=>{
      this.ordersArr=res
      this.total=res.length;
      this.loading=false;
    })
  }
  changePage(page: any) {
    this.page = page;
    this.loaddata();
  }



}
