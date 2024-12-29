import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product! : Product; // Added ! for acception null value also

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails(){
    // get the id parameter and convert to number
    const ProductId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductDetails(ProductId).subscribe(
      (data) => {
        this.product = data;
      }
    )
  }

}
