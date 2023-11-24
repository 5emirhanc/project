import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products2',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  dataLoaded = false;
  products: Product[] = [];
  productDelete!: FormGroup;
  category: Category[] = [];
  selectedFile!: File;
  public response!: { dbPath: '' };
  constructor(private productService: ProductService,  private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,private categoryService: CategoryService,
private toastrService: ToastrService) {

this.productDelete = this.formBuilder.group({
  id: [''],
  code: [''],
  productName: [''],
  categoryId: [''], 
  description: [''],
  isActive: [false],
}); }

    
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts()
      }
    })
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44307/${serverPath}`;
  }
  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response
      for (let index = 0; index < this.products.length; index++) {
        this.productDelete.controls["id"].setValue(this.products[index].id);
        this.productDelete.controls["code"].setValue(this.products[index].code);
        this.productDelete.controls["productName"].setValue(this.products[index].productName);
        this.productDelete.controls["description"].setValue(this.products[index].description);
        this.productDelete.controls["categoryId"].setValue(this.products[index].categoryId);
      }
      console.log(this.products )
      this.dataLoaded = true;
    })
  }

  delete() {
    if (this.productDelete.valid) {
      let product = Object.assign({}, this.productDelete.value);
      this.productService.add(product).subscribe((response: any) => { // response türünü belirtiyoruz
        this.toastrService.success("Başarılı");
        this.getProducts();
      });
    } else {
      this.toastrService.error("Formunuz Eksik", "Dikkat");
    }
  }
  

  getProductsByCategory(categoryId:string) {
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response
      this.dataLoaded = true;
    })   
  }
  
}
