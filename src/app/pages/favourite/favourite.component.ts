import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  total = 100;
  page: any = 1;
  limit: number = 9;
  carsArr:any=[];
  favouritesCar:any=[];
  ListingcarsArr:any=[];
  loading=false;
  publisherData:any;
  userId:any;
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
    this.sharedService.get(`GetCars`).subscribe(res=>{
      this.carsArr=res
      this.loading=false;
      this.sharedService.get(`getFavourite?_UserId=${this.userId}`).subscribe(res=>{
        this.favouritesCar=res;
        this.favouritesCar.map(el=>{
          this.carsArr.map(car=>{
            if(el.carId==car.id){
              car.isFav=true;
            }
          })
        })
        this.carsArr.map(car=>{
          if(car.isFav){
            this.ListingcarsArr.push(car);
          }
        })
        this.total=this.ListingcarsArr.length;
      });
    })
  }
  getPublisherFun(modal,car){
    this.publisherData={...car.ownerDetails};
    this.sharedService.openLg(modal);
  }
  removeFavourite(car){

    let favId;
    this.favouritesCar.map(el=>{
        if(el.carId==car.id){
          favId=el.id;
        }
    });
    this.sharedService.delete(`RemoveFavourite?_id=${favId}`).subscribe(res=>{
      this.toastr.success('تم حذف السيارة كسيارة مفضلة لديك')
      // this.loaddata();
      this.ListingcarsArr.map((el,i)=>{
        if(el.id==car.id){
          this.ListingcarsArr.splice(i, 1)
        }
      })
      console.log(car)
      console.log(this.ListingcarsArr)

    });

    
  }


}
