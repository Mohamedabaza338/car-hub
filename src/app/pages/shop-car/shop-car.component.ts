import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';


@Component({
  selector: 'app-shop-car',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.scss']
})
export class ShopCarComponent implements OnInit {
  total = 100;
  page: any = 1;
  limit: number = 9;
  carsArr:any=[];
  favouritesCar:any=[];
  loading=false;
  publisherData:any;
  userId:any;
  // serach
  fuelTypeArr=[{value:'Automatic',text:"اوتوماتيك"},{value:'Manual',text:"مانوال"}];
  disabledArr=[{value:false,text:"لا"},{value:true,text:"نعم"}];
  disableValue;
  fuelType:any;
  conditionsArr=[{value:'New',text:"جديد"},{value:'Used',text:"مستعمل"}];
  condition:any;
  priceFROM:any;
  priceTo:any;
  constructor(public sharedService:SharedHttpService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loaddata();
  }
  loaddata() {
    this.loading = true;
    this.userId =localStorage.getItem('id');
    if(this.page==0){
      this.page=1;
    }
    let url=`GetCars?`;
    if(this.fuelType ){
      url += `fuelType=${this.fuelType}&`
    }
    if(this.disableValue==true){
      url += `disabled=${this.disableValue}&`
    }else if(this.disableValue==false){ 
      url += `disabled=${this.disableValue}&`
    }
    if(this.condition){
      url += `condition=${this.condition}&`
    }
    if(this.priceFROM){
      url += `PriceFrom=${this.priceFROM}&`
    }
    if(this.priceTo){
      url += `PriceTo=${this.priceTo}`
    }
    this.sharedService.get(url).subscribe(res=>{
      this.carsArr=res
      this.total=res.length;
      this.sharedService.get(`getFavourite?_UserId=${this.userId}`).subscribe(res=>{
        this.favouritesCar=res;
        this.favouritesCar.map(el=>{
          this.carsArr.map(car=>{
            if(el.carId==car.id){
              car.isFav=true;
            }
            
          })
        })
        this.loading=false;
      });
    })
  }
  onSearch() {
    this.page = 1;
    this.loaddata();
  }
  getPublisherFun(modal,car){
    this.publisherData={...car.ownerDetails};
    this.sharedService.openLg(modal);
  }
  addOrRemoveFavourite(car){
    this.loading=true;
    let obj={
      "carId": car.id,
      "userId": this.userId
    }
    if(car.isFav){
      let favId;
      this.favouritesCar.map(el=>{
          if(el.carId==car.id){
            favId=el.id;
          }
      });
      this.sharedService.delete(`RemoveFavourite?_id=${favId}`).subscribe(res=>{
        this.toastr.success('تم حذف السيارة كسيارة مفضلة لديك')
        this.loaddata();
        this.loading=false;

      });

    }else{
      this.sharedService.post(`AddFavourite`,obj).subscribe(res=>{
        this.toastr.success('تمت إضافة السيارة كسيارة مفضلة لديك')
        this.loaddata();
        this.loading=false;

      });

    }
  }

}
