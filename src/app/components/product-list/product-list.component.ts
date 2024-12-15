import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategory: number | undefined;
  
  constructor(private productService: ProductService, private route: ActivatedRoute) { } // Here Activated Route is used for routing

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts(); // Whenever changes or route being clicked as it is subscribed
    })
    // this.listProducts();
  }

  listProducts() {

    // check if "id" parameter is availbable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    
    if(hasCategoryId){
      // get the category Id and retrive that data
      this.currentCategory = Number(this.route.snapshot.paramMap.get('id')); // I typecast String into number
      // this.currentCategory = +this.route.snapshot.paramMap.get('id'); // Also use this
    } else{
      // taking the default category id
      this.currentCategory = 1;
    }
    this.productService.getProductList(this.currentCategory).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
