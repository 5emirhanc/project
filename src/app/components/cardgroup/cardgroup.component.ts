import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cardgroup',
  templateUrl: './cardgroup.component.html',
  styleUrls: ['./cardgroup.component.css'],
})
export class CardgroupComponent implements OnInit {
  dataLoaded = false;
  products: Product[] = [];

  categories: Category[] = [];
  currentCategory!: Category;

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
    if (category) {
      this.getProductsByCategory(category.id.toString());
    } else {
      this.getProducts();
    }
  }

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44307/${serverPath}`;
  };

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: string) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response;
        this.dataLoaded = true;
      });
  }

  public getActiveProducts(): Product[] {
    return this.products.filter(product => product.isActive === true);
  }
}
