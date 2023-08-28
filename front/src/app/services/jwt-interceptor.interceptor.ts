// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { tap } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class JwtInterceptorInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     if (req.headers.get('skip')) return next.handle(req);

//     if (localStorage.getItem('username') && localStorage.getItem('token')) {
//       req = req.clone({
//         setHeaders: {
//           Authorization: localStorage.getItem('token') as string,
//         },
//       });
//     }

//     return next.handle(req).pipe(
//       tap(
//         () => {},
//         (err: any) => {
//           if (err instanceof HttpErrorResponse) {
//             if (err.status !== 401) {
//               return;
//             }
//             else {
//               console.log("401, needs to redirect")
//               this.router.navigate(['/']);
//             }

//           }
//         }
//       )
//     );
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // skip some requests
    if (request.headers.get('skip')) return next.handle(request);

    if (localStorage.getItem('username') && localStorage.getItem('token')) {
     
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token') as string,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          this.authService.logOut();
          this.router.navigate(['/']);
        }
        const error = err.error?.message || err.statusText;
        return throwError(() => error);
      })
    );
  }
}
