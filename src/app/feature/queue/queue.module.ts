import { NgModule } from '@angular/core';
import { WaitingRoomComponent } from './pages/waiting-room/waiting-room.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { queueRoutes } from './queue.routing';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [WaitingRoomComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(queueRoutes),
    HttpClientModule,
    ProgressBarModule
  ],
})
export class QueueModule {}
