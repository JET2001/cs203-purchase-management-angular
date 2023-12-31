import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { HeaderComponent } from './components/header/header.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    TextButtonComponent,
    InputFieldComponent,
    HeaderComponent,
    LoginPopupComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ],
  exports: [
    CommonModule,
    TextButtonComponent,
    InputFieldComponent,
    HeaderComponent,
    FormsModule,
    DropdownModule,
    CarouselModule,
    LoginPopupComponent,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
