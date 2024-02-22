import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-register-caragent',
  templateUrl: './register-caragent.component.html',
  styleUrls: ['./register-caragent.component.scss']
})
export class RegisterCaragentComponent implements OnInit {
  address:any;
  latitude: any;
  longitude: any;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  loc: any;
  photo:any|undefined;
  photoAPI:any|undefined;
  url: any;
  constructor(public sharedService:SharedHttpService, private toastr : ToastrService, private router : ActivatedRoute) { }

  ngOnInit(): void {
  }
  moving(map) {
    this.latitude = map.getCenter().lat();
    this.longitude = map.getCenter().lng();
    let location = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
    this.loc = location;
  }
  register(){
    let obj = {
      "address": this.address,
      "longitude": this.longitude,
      "latitude": this.latitude,
      "userId": this.router.snapshot.params['id'],
      "logo":this.photoAPI
    }
    var formData= new FormData();
    formData.append("address", this.address);
    formData.append("longitude", this.longitude);
    formData.append("latitude", this.latitude);
    formData.append("userId", this.router.snapshot.params['id']);
    formData.append("logo", this.photoAPI);

    this.sharedService.post('PostCarAgent',formData).subscribe(res=>{
      console.log(res)
      this.photoAPI=undefined;
      this.url;undefined;
      this.latitude=undefined;
      this.longitude=undefined;
      this.address=undefined;
      localStorage.clear();
      localStorage.setItem('id',this.router.snapshot.params['id']);
      this.toastr.success('من فضلك قم بتأكيد البريد الإلكتروني')
      // this.route.navigate(['/']);
      

    },(err:any)=>{
      // console.log('eeeeeeeeeeeeeee',err.error)
      // this.toastr.error(err.error[0]);

    });
  }
  selectCarAgentImg(e){
    this.photoAPI= e.target.files[0];
    console.log(this.photoAPI)
    var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = (_event) => {
			this.url = reader.result; 
		}
  }

}
