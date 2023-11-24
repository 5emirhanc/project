import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  public isCollapsed = true;
  public isCollapsed2 = true;
  productAddForm: FormGroup;
  productDelete: FormGroup;
  product: Product[] = [];
  category: Category[] = [];
  selectedFile!: File;
  public response!: { dbPath: '' };
  collapse: any;  

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {
    this.productAddForm = this.formBuilder.group({
      code: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      price :['',Validators.required],
      file: ['', Validators.required],
    });

    this.productDelete = this.formBuilder.group({
      id: [''],
      code: [''],
      productName: [''],
      price :[''],
      categoryId: [''], 
      description: [''],
      isActive: [false],
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  public uploadFinished = (event: any) => {
    this.response = event;
    this.productAddForm.patchValue({
      file: this.response.dbPath
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.product = response;
      for (let index = 0; index < this.product.length; index++) {
        this.productDelete.controls["id"].setValue(this.product[index].id);
        this.productDelete.controls["code"].setValue(this.product[index].code);
        this.productDelete.controls["productName"].setValue(this.product[index].productName);
        this.productDelete.controls["price"].setValue(this.product[index].price);
        this.productDelete.controls["description"].setValue(this.product[index].description);
        this.productDelete.controls["categoryId"].setValue(this.product[index].categoryId);
      }
    });
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
  

  changeCategory(event: any) {
    this.productAddForm.controls["categoryId"].setValue(event.target.value);
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(_response => {
        this.toastrService.success("Başarılı");
        this.getProducts();
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
          }
        }
      });
    } else {
      this.toastrService.error("Formunuz Eksik", "Dikkat");
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.category = response;
    });
  }
}
