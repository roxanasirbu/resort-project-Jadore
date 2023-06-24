import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 
  @Output() SideNavigationToggle = new EventEmitter();
  myForm: any = this.formBuilder.group({});

constructor( private formBuilder: FormBuilder,){}

ngOnInit(): void {
  this.myForm = this.formBuilder.group({
    emailFormControl: ['', Validators.required]
  });
}
onToggleOpenSideNav(){
  this.SideNavigationToggle.emit();
 }

}
