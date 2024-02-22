import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  phone:any;
  userName:any;
  email:any;
  password:any;
  confirmPassword:any;
  userType:any;
  userTypesArr:any=[{'value':'User','name':'مستخدم'},{'value':'CarAgent','name':'معرض سيارات'}]
  constructor(public sharedService:SharedHttpService,private route : Router,private toastr : ToastrService) { }

  ngOnInit(): void {
  }
  register(){
    
    let obj = {
      "userName": this.userName,
      "phoneNumber": this.phone,
      "email": this.email,
      "userType": this.userType,
      "password": this.password,
      "compareUserPassword": this.password,
      "clientURI": "http://localhost:4200/emailconfirmation"
    }
    
    this.sharedService.post('register',obj).subscribe(res=>{
      
      if(this.userType=='User'){
        this.toastr.success('من فضلك قم بتأكيد البريد الإلكتروني')
        localStorage.clear();
        localStorage.setItem('userType','User')
      }else{
        this.route.navigate([`/registerCarAgent/${res}`]);
      }
      

    },(err:any)=>{
      if(err.error.message){
        console.log('eeeeeeeeeeeeeee',err.error.message)
        this.toastr.error(err.error.message);
      }else{
        console.log('eeeeeeeeeeeeeee',err.error[0])
        this.toastr.error(err.error[0]);
      }

    });
  }

}
