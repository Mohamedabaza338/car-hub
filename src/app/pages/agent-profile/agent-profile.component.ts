import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.scss']
})
export class AgentProfileComponent implements OnInit {
  agenceId:any;
  total = 100;
  page: any = 1;
  limit: number = 9;
  carsArr:any=[];
  loading=false;
  carAgentData:any;
  deletedCarId:any;
  phoneNumber:any;


  // addCar
  adTypeArr=[{id:1,text:"إيجار"},{id:2,text:"بيع"}];
  adType:any;
  conditionsArr=[{id:1,text:"جديد"},{id:2,text:"مستعمل"}];
  condition:any;
  fuelTypeArr=[{id:1,text:"بنزين"},{id:2,text:"غاز"}];
  fuelType:any;
  manufacturedYear:any;
  transmissionTypeArr=[{id:'بنزين',text:"اوتوماتيك"},{id:'غاز',text:"مانوال"}];
  disabledArr=[{value:false,text:"لا"},{value:true,text:"نعم"}];
  disableValue;
  transmissionType:any;
  color:any;
  engineCapacityArr=[{id:1,text:"1300"},{id:2,text:"1500"},{id:3,text:"1600"},{id:4,text:"2000"}];
  engineCapacity:any;
  insertTime:any;
  price:any;
  brandsArr:any=[];
  brandId:any;
  modelsArr:any=[];
  modelId:any;
  detail:any;
  photoAPI:any|undefined;
  geoCoder: google.maps.Geocoder;
  latitude: any;
  longitude: any;
  loc:any;
  center:any = { lat: 24, lng: 12 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  url: any;
  userId:any;
  review:any;
  rate:any;
  agentCarId:any;
  countOfReviews:any;
  reviews:any=[];
  constructor( private modalService: NgbModal,public sharedService:SharedHttpService,private toastr: ToastrService, public router : ActivatedRoute) { }

  ngOnInit(): void {
    this.userId=localStorage.getItem('id');
    this.agenceId=this.router.snapshot.params['agenceId']; 
    this.sharedService.get(`Get?id=${this.agenceId}`).subscribe(res=>{
      this.agentCarId=res.id;
    })
    this.loaddata();
  }
  loaddata() {
    this.loading = true;
    if(this.page==0){
      this.page=1;
    }
    this.sharedService.get(`GetAgenceCars?AgenceId=${this.agenceId}`).subscribe(res=>{
      this.carsArr=res
      this.total=res.length;
      this.loading=false;
      
      this.sharedService.get(`Get?id=${this.agenceId}`).subscribe(carAgentRes=>{
        this.carAgentData=carAgentRes;
        this.longitude = carAgentRes.longitude;
        this.latitude = carAgentRes.latitude;
        let location = new google.maps.LatLng(this.latitude,this.longitude);
        this.loc = location;
        this.center = { lat: parseFloat(this.latitude), lng: parseFloat(this.longitude)   };
      });
      this.sharedService.get(`CarBrand`).subscribe(brandRes=>{
        this.brandsArr=brandRes;
      });
      this.sharedService.get(`GetAgenceReview?id=${this.agenceId}`).subscribe(res=>{
        this.countOfReviews=res.length;
        this.reviews=res;
      })
    });
  }
  addReviewRate(num: number) {
    this.rate = num;
  }
  addReview(){
    let obj={
      "review": this.review,
      "userId": this.userId,
      "carAgenceId": this.agentCarId,
      "rate": this.rate
    }
    this.sharedService.post(`AddReview`, obj).subscribe((res) => {
      this.rate=undefined;
      this.review=undefined;
      this.toastr.success('تمت إضافة التقييم بنجاح');
      this.loaddata();
    });
  }
  selectCarImg(e:any){
    this.photoAPI= e.target.files[0];
    console.log(this.photoAPI)
    var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = (_event) => {
			this.url = reader.result; 
		}
  }
  selectBrand(e:any){
    if(e){
      this.sharedService.get(`CarModels?_brandId=${e.id}`).subscribe(res=>{
        this.modelsArr=res;
      })
    }
  }
 
  addNewCar(){
    let date = Date.now();
    console.log(date)
    this.modalService.dismissAll();
    this.loading=true;
    var formData= new FormData();
    formData.append("AdType", this.adType);
    formData.append("Conditions", this.condition);
    formData.append("FuelType", this.fuelType);
    formData.append("ManufacturedYear", this.manufacturedYear);
    formData.append("TransmissionType", this.transmissionType);
    formData.append("Color", this.color);
    formData.append("EngineCapacity", this.engineCapacity);
    formData.append("Details", this.detail);
    formData.append("OwnerId", this.agenceId);
    formData.append("ModelId", this.modelId);
    formData.append("Price", this.price);
    formData.append("Disabled", this.disableValue);
    formData.append("CarImges",this.photoAPI)




    
    this.sharedService.post('AddCar',formData).subscribe(res=>{
      this.photoAPI=undefined;
      this.price=undefined;
      this.modelId=undefined;
      this.detail=undefined;
      this.engineCapacity=undefined;
      this.color=undefined;
      this.transmissionType=undefined;
      this.manufacturedYear=undefined;
      this.fuelType=undefined;
      this.condition=undefined;
      this.adType=undefined;
      this.url='';
      this.toastr.success( 'تمت الإضافة بنجاح');
      this.loaddata();
    })
  } 
  deleteCar(modal,id){
    this.deletedCarId=id;
    this.sharedService.open(modal);
  }
  onDeleteCar(){
    this.sharedService.delete(`DeleteCar?_id=${this.deletedCarId}`).subscribe(res=>{
      this.toastr.success('تم حذف السيارة بنجاح');
      this.loaddata();
      this.modalService.dismissAll()
    })
  }
  getMobileModal(modal,car){
    this.phoneNumber=car.phone;
    this.sharedService.open(modal);
  }
 

}
