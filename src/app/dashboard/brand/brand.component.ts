import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  loading:boolean=false;
  search: string = '';
  total = 100;
  page: any = 1;
  limit: number = 9;
  brandsArr: any[] =[]; 
  brandNameAr:any;
  editedBrand:any;
  photo:any|undefined;
  photoAPI:any|undefined;
  url: any;



  constructor( private modalService: NgbModal,public sharedService:SharedHttpService,private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.loading = true;
    if(this.page==0){
      this.page=1;
    }
    let url=``;
    url= this.search ? `CarBrand?_carbrand=${this.search}`:  `CarBrand` ;
    this.sharedService.get(url).subscribe(res=>{
      this.brandsArr=res
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

  selectBrandImg(e:any){
    this.photoAPI= e.target.files[0];
    console.log(this.photoAPI)
    var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = (_event) => {
			this.url = reader.result; 
		}
  } 
  addNewBrand(){
    this.modalService.dismissAll();
    this.loading=true;
    var formData= new FormData();
    formData.append("BrandImg", this.photoAPI);
    formData.append("TypeName", this.brandNameAr);
    
    this.sharedService.post('AddCarBrand',formData).subscribe(res=>{
      this.photoAPI=undefined;
      this.brandNameAr='';
      this.url='';
      this.photo=undefined;
      this.toastr.success( 'تمت الإضافة بنجاح');
      this.loaddata();
    })
  
  }
  editBrand(brand: any, mymodal : any){
    this.editedBrand = {...brand};
    console.log(this.editedBrand)
    this.sharedService.open(mymodal);
  }
  updatebrand(){
    this.modalService.dismissAll();
    this.loading=true;
    var formData= new FormData();
    if(this.photoAPI!=undefined){
      formData.append("BrandImg", this.photoAPI);
    }
    formData.append("Id", this.editedBrand.id);
    formData.append("TypeName", this.editedBrand.typeName);
    this.sharedService.put(`updateBrand`,formData).subscribe(res=>{
      this.photoAPI=undefined;
      this.editedBrand=undefined;
      this.url='';
      this.toastr.success('تم التعديل بنجاح');
      this.loaddata();
    })
  }
}
