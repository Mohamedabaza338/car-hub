import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  loading:boolean=false;
  search='';
  total = 100;
  page: any = 1;
  limit: number = 9;
  productArr: any[] =[]; 
  deletedProductId:any;
  editedProduct:any;

  photo:any;
  photoAPI:any;
  url:any;
  name:any;
  description:any;
  price:any;


  constructor(public sharedService:SharedHttpService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    if(this.page==0){
      this.page=1;
    }
    let url: any = `api/Product`
    if (this.search != '') {
      url = `api/Product?ProductName=${this.search}`
    }
    this.sharedService.get(url).subscribe(res=>{
      this.productArr=res;
      this.total=res.length;
      this.loading=false;
    })
  }
  onSearch() {
    this.page = 1;
    this.loadData();
  }
  changePage(page: any) {
    this.page = page;
    this.loadData();
  }

  addProduct(modal){
    this.loading=true;
    var formData= new FormData();
    formData.append("productImage", this.photoAPI);
    formData.append("Name", this.name);
    formData.append("Descriptions", this.description);
    formData.append("price", this.price);
    formData.append("userID", "2a1d69f4-4ddd-46c4-9b8a-5281a5d800d4");

    this.sharedService.post(`api/Product`,formData).subscribe(res=>{
      this.toastr.success('تم إضافة المنتج بنجاح');
      modal.dismiss('Cross click');
      this.photo=undefined;
      this.photoAPI=undefined;
      this.url=undefined;
      this.name=undefined;
      this.description=undefined;
      this.price=undefined;
      this.loading=false;
      this.loadData();
    })
    
  }
  
  selectImg(e:any){
    this.photoAPI= e.target.files[0];
    var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = (_event) => {
			this.url = reader.result; 
		}
  } 






}
