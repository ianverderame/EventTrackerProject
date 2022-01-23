import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RunService } from './services/run.service';
import { FormsModule } from '@angular/forms';
import { EnabledPipe } from './pipes/enabled.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnabledPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RunService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
