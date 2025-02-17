import { Component, inject } from "@angular/core";
import { CommonModule, NgIf } from "@angular/common";
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomRemoveDashes } from "../pipes/remove-dashes.pipe";
import { CurrentDateTimePipe } from "../pipes/current-date-time.pipe";
import { menuItems } from "../utils/menu-items";
import { toLowerCaseArray, toUpperCaseArray } from "../utils/upper-lower-case-menu-item";
import { RouterLink } from "@angular/router";
import { UserService } from "../service/user.service";
import { AuthenticationComponent } from "../authentication/authentication.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { logoutComponent } from "../logout/logout.component";
import { ColorBasketDirective } from "../directives/color-basket.directive";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, MatToolbarModule, CustomRemoveDashes, CurrentDateTimePipe, NgIf, RouterLink, ColorBasketDirective]
})

export class HeaderComponent {
    public readonly headerItem1: string = 'Главная';
    public readonly headerItem2: string = 'О компании';
    public readonly headerItem3: string = 'Каталог';
    public readonly headerDate: Date = new Date();
    private readonly dialog: MatDialog = inject(MatDialog);
    public userService: UserService = inject(UserService);
    private readonly destroy$ = new Subject<void>();
    
    public isShowCatalog: boolean = true;
    public isUppercase: boolean = true;
    public menuItems: string[] = menuItems;
    
    public changeMenuText(): boolean {
        this.menuItems = this.isUppercase ? toLowerCaseArray(this.menuItems) : toUpperCaseArray(this.menuItems);
        return (this.isUppercase = !this.isUppercase);
    }
    
    
    public openLoginDialog(): void {
        const dialogRef: MatDialogRef<AuthenticationComponent> = this.dialog.open(AuthenticationComponent);
        
        dialogRef.afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe((result: string): void => 
            result === 'admin' ? this.userService.loginAsAdmin() :
            result === 'user' ? this.userService.loginAsUser() : void 0
        );
    }
    
    public logoutOpenDialog(): void {
        const dialogRef: MatDialogRef<logoutComponent> = this.dialog.open(logoutComponent);
        
        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: string): void | null => {
                result === 'logout' ? this.userService.logout() : null;
            });
    }
    
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
