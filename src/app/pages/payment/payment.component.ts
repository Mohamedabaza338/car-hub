import { Component, OnInit } from '@angular/core';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private sharedService:SharedHttpService, private toastr :ToastrService,private route:Router) { }
  userId:any;
  ngOnInit(): void {
    this.userId=localStorage.getItem('id')
  }
  onPaymentStatus(e){
    console.log('aaaaa',e)
  }

  createPurchase = (nonce: string,chargeAmount:number) => {
    let obj={
      "userId": this.userId,
      "nonce": nonce
    }
    this.sharedService.post(`api/premium`,obj).subscribe(res=>{
      console.log('sssssssssssssssssssssssss');
      this.toastr.success('تم الدفع بنجاح');
      this.route.navigate([`/profile/${this.userId}`]);
    });
    this.sharedService.get(`api/premium/IsPremium?_userId=${this.userId}`).subscribe(res=>{
      if(res){
        console.log('sssssssssssssssssssssssss');
        this.toastr.success('تم الدفع بنجاح');
        this.route.navigate([`/profile/${this.userId}`]);

      }
    })
  
  }
   
}
