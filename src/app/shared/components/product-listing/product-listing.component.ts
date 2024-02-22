import { Component, Input, OnInit } from '@angular/core';
import { SharedHttpService } from '../../services/shared-http.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  @Input() fromHome;
  productArr:any=[];
  orderedProduct;
  
  constructor(public sharedService:SharedHttpService,private toastr:ToastrService,private modalService:NgbModal) { }

  ngOnInit(): void {
    let url: any = `api/Product`
  
    this.sharedService.get(url).subscribe(res=>{
      this.productArr=res;
      if(this.fromHome){
        this.productArr=this.productArr.slice(0.3);
      }
    })
  }
  openPaymentModal(modal,product){
    this.orderedProduct={...product};
    this.sharedService.open(modal)
  }
  onPaymentStatus(e){
  }

  createPurchase =(nonce: string,chargeAmount:number)=> {
    let obj={
      "userId": localStorage.getItem('id'),
      "productId": this.orderedProduct.id,
      "ordered_at": "2023-07-11T04:02:57.744Z",
      "price": this.orderedProduct.price,
      "status":1
    }
    this.sharedService.post(`api/Order/OrderProduct?Nonce=${nonce}`,obj).subscribe(res=>{
      this.toastr.success('تم الدفع بنجاح');
    });
    setTimeout(() => {
      this.toastr.success('تم طلب المنتج بنجاح');
      this.modalService.dismissAll();
      
    }, 3000);
  }


}
