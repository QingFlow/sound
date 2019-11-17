import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDragDropModule } from 'ng-drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.mudule';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { SvgModule } from './core/svg/svg.module';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    OverlayModule,
    SvgModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    NgxElectronModule,
    NgDragDropModule.forRoot()
  ],
  declarations: [
    AppSidebarComponent,
    AppHeaderComponent,
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
