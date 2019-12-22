import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'payment-dialog',
  templateUrl: 'payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css'],
  host: {
    '(document:keydown)': 'handlePaymentCard($event)'
  }
})
export class PaymentDialog {
  keys: string[] = [];
  dialog: MatDialogRef<PaymentDialog>

  constructor(
    public dialogRef: MatDialogRef<PaymentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialog = dialogRef;
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  setPaymentType(type: string) {
    this.data.paymentType = type
    if (type == "cash") {
      this.data.paymentSuccess = true;
      setTimeout(() => this.onNoClick(), 2500);
    }
  }

  handlePaymentCard(event: KeyboardEvent) {
    if (this.data.paymentType == "card")
      if (event.keyCode == 13) {
        console.log(this.keys.join(''));
        this.data.cardNumber = this.keys.join('');
        this.data.paymentSuccess = true;
        this.keys = [];
        setTimeout(() => this.onNoClick(), 2500);

      } else
        this.keys.push(event.key)
  }

}

export interface DialogData {
  amount: number;
  paymentType: string;
  cardNumber: string;
  paymentSuccess: boolean;
  amountPayed: number;
}

