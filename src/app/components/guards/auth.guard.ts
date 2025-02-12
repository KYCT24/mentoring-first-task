import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../service/user.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);
    
    if (userService.isAdmin) {
        return true;
    } else {
        return router.navigate(['users']).then((_result: boolean) => false);
    }
};
