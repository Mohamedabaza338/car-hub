import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  
  loading:boolean=false;
  search: string = '';
  total = 100;
  page: any = 1;
  limit: number = 9;
  modelsArr: any[] =[]; 
  brandId:any;
  modelNameAr:any;
  editedBrand:any;
  url: any;



  constructor( private modalService: NgbModal,public sharedService:SharedHttpService,private toastr: ToastrService,private router:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.loading = true;
    if(this.page==0){
      this.page=1;
    }
    this.brandId=this.router.snapshot.params['id'];
    this.sharedService.get(`CarModels?_brandId=${this.brandId}`).subscribe(res=>{
      this.modelsArr=res
      this.total=res.length;
      this.loading=false;
    })
  }
  onSearch() {
    this.page = 1;
    this.loaddata();
  }
  changePage(page: any) {
    this.page = page;
    this.loaddata();
  }

  addNewModel(){
    this.modalService.dismissAll();
    this.loading=true;
    var formData= new FormData();
    formData.append("ModelName", this.modelNameAr);
    formData.append("BrandId", this.brandId);
    this.sharedService.post('AddCarModel',formData).subscribe(res=>{
      this.modelNameAr='';
      this.url='';
      this.toastr.success( 'تمت الإضافة بنجاح');
      this.loaddata();
    })
  
  }
  editmodel(model: any, mymodal : any){
    this.sharedService.open(mymodal);
    this.editedBrand = {...model};
  }
  updatemodel(){
    this.modalService.dismissAll();
    this.loading=true;
    var formData= new FormData();
 
    formData.append("nameAr", this.editedBrand.nameAr);
    formData.append("nameEn", this.editedBrand.nameEn);
    
    // this.sharedService.patch(`model/${this.editedBrand._id}`,formData).subscribe(res=>{
    //   this.photoAPI=undefined;
    //   this.editedBrand=undefined;
    //   this.url='';
    //   this.toastr.success( this.IsArabic?'تم التعديل بنجاح':'model Updated Successfully');
    //   this.loaddata();
    // })
  }
}
