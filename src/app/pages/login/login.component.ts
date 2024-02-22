import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:any;
  password:any;


  constructor(public route: Router, private toastr: ToastrService,private sharedService: SharedHttpService,) {  }

  ngOnInit() {
  }

 

  login() {
    let obj = {
      "email": this.email,
      "userPassword": this.password,
    }
    this.sharedService.post('Login',obj).subscribe(res=>{
      console.log(res)
      this.toastr.success('تم تسجيل الدخول بنجاح ');
      localStorage.clear();
      localStorage.setItem('id',res.id);
      localStorage.setItem('role',res.role);
      if(res.role=='Admin'){
        this.route.navigate(['/dashboard/brands']);

      }else{
        this.route.navigate(['/']);

      }


    },(err:any)=>{
      // console.log('eeeeeeeeeeeeeee',err.error)
      if(err.error[0]){
        
        this.toastr.error(err.error[0]);
      }else{
        this.toastr.error(err.error.errorMessage);

      }

    });

   

  }

}
