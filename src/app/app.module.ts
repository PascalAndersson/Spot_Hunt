// External libs / components. -> @NgModule imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';

// Generated components. -> @NgModule declarations
import { AppComponent } from './app.component';
import { BrowseComponent } from './components/browse/browse.component';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { DetailsComponent } from './components/details/details.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Google maps
import { AgmCoreModule } from '@agm/core';

// Read JSON
import { HttpModule } from '@angular/http';

// Services. -> @NgModule providers
import { DbService } from './services/db.service';

const appRouts = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'add', component: AddComponent },
  { path: 'details', component: DetailsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    HomeComponent,
    AddComponent,
    DetailsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRouts),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBLa5xPtfsWZK_ZNROM9e6hvQ3mkNrbTzQ'
    })
  ],
  providers: [
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
