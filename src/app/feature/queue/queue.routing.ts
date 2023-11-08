import { Routes } from '@angular/router';
import { WaitingRoomComponent } from './pages/waiting-room/waiting-room.component';
import { logInGuard } from '../purchase/user-login.guards';

export const queueRoutes: Routes = [
  {
    path: 'room',
    component: WaitingRoomComponent,
    canActivate: [logInGuard()],
  },
];
