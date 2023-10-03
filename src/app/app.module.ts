import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { starshipsReducer } from './states/starships/starships.reducer';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StarshipsEffects } from './states/starships/starships.effects';
import { PlayerComponent } from './components/player/player.component';
import { PlayerViewComponent } from './components/player/player-view/player-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatchComponent } from './components/match/match.component';
import { MatchViewComponent } from './components/match/match-view/match-view.component';
import { matchReducer } from './states/match/match.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { StarshipSelectionComponent } from './components/starship-selection/starship-selection.component';
import { StarshipSelectionListComponent } from './components/starship-selection/starship-selection-list/starship-selection-list.component';
import { StarshipComponent } from './components/starship/starship.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatchEffects } from './states/match/match.effects';

const BASIC_MODULES = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
];

const STORE_MODULES = [
  StoreModule.forRoot({ starships: starshipsReducer, match: matchReducer }),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
  }),
  EffectsModule.forRoot([StarshipsEffects, MatchEffects]),
];

const MATERIAL_MODULES = [
  MatCardModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerViewComponent,
    MatchComponent,
    MatchViewComponent,
    StarshipSelectionComponent,
    StarshipSelectionListComponent,
    StarshipComponent,
  ],
  imports: [...BASIC_MODULES, ...STORE_MODULES, ...MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
