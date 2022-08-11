import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    MatAutocompleteModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule,
    MatRadioModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatSlideToggleModule,
    CommonModule
  ],
  exports: [BrowserAnimationsModule,
    MatAutocompleteModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule,
    MatRadioModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatSlideToggleModule,]
})
export class NgMaterialModule {
}
