import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentDialog } from '../payment/payment-dialog.component';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '(document:keypress)': 'handleBarcode($event)'
  }
})
export class HomeComponent {


  public transactions: Product[] = [];
  public keys: string[] = [];
  public http: HttpClient;
  public baseUrl: string;

  public products: Product[];

  paymentActive: boolean = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public dialog: MatDialog) {
    this.http = http;
    this.baseUrl = baseUrl;

    http.get<Product[]>(baseUrl + 'product').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }

  addToTransactions(product) {
    if (this.transactions == null)
      this.transactions = [];
    this.transactions.unshift(product);
  }
  deleteTransaction(index) {
    this.transactions.splice(index, 1);
  }

  getTotalCost() {
    return Math.round(this.transactions.map(t => t.price).reduce((acc, value) => acc + value, 0) * 100) / 100;
  }

  handleBarcode(event: KeyboardEvent) {
    if (!this.paymentActive) {
      if (event.keyCode == 13) {
        console.log(this.keys.join(''));
        this.http.get<Product>(this.baseUrl + 'product/byBarcode/' + this.keys.join('')).subscribe(result => {
          if (result) {
            this.addToTransactions(result);
          }
        }, error => console.error(error));
        this.keys = [];
      } else
        this.keys.push(event.key)
    }
  }

  startPayment(): void {
    this.paymentActive = true
    const dialogRef = this.dialog.open(PaymentDialog, {
      width: '400px',
      data: { amount: this.getTotalCost(), paymentType: null, paymentSuccess: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.paymentActive = false
      console.log('The dialog was closed');
      if (result.paymentSuccess == true)
        this.transactions = [];
    });
  }

}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  barcode: string;
}

