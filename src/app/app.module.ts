import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDragDropModule } from 'ng-drag-drop';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.mudule';
import { AppHeaderComponent } from './layout/header/header.component';
import { AppSidebarComponent } from './layout/sidebar/sidebar.component';
import { SvgModule } from './core/svg/svg.module';
import { NgxElectronModule } from 'ngx-electron';
import { StartupService } from './core/service/startup.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd';

export function StartupServiceFactory(startupService: StartupService): () => Promise<any> {
  return () => startupService.load();
}

const APPINIT_PROVIDERS: Provider[] = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    OverlayModule,
    SvgModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    NgxElectronModule,
    NgDragDropModule.forRoot(),
    NzMessageModule
  ],
  declarations: [
    AppSidebarComponent,
    AppHeaderComponent,
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ...APPINIT_PROVIDERS,
    NzMessageService
  ],
})
export class AppModule { }
