import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn | any = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.signedin$.pipe(
    skipWhile((value) => value === null),
    take(1), // take the first value emitted by the signedin$ BehaviorSubject
    tap((authenticated) => {
      if (!authenticated) {
        router.navigateByUrl('/');
      }
    })
  );
};
