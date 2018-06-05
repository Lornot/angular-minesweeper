import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TimerComponent } from './timer/timer.component';
import { GameWinDialogComponent } from './game-win-dialog/game-win-dialog.component';
import { RecordsComponent } from './records/records.component';
import { RecordsService } from './records/records.service';
import { GameOverDialogComponent } from './game-over-dialog/game-over-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        TileComponent,
        TimerComponent,
        GameWinDialogComponent,
        RecordsComponent,
        GameOverDialogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatRadioModule,
        MatButtonModule
    ],
    providers: [ RecordsService ],
    bootstrap: [ AppComponent ],
    entryComponents: [ GameWinDialogComponent, GameOverDialogComponent ]
})
export class AppModule {
}
