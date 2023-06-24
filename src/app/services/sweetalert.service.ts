import { Component, Injectable, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
  })

export class SweetAlertService {
  ngOnInit() {
    
  }
  tinyAlert() {
    Swal.fire('Hey there!');
  }

  alertMessage(message: string){
    Swal.fire(message);
  }

  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success');
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }

  
}