import { Component } from "@angular/core";
import { CommonModule, NgIf } from "@angular/common";
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomRemoveDashes } from "../../pipes/remove-dashes.pipe";
import { CurrentDateTimePipe } from "../../pipes/current-date-time.pipe";
import { menuItems } from "../utils/menu-items";
import { toLowerCaseArray, toUpperCaseArray } from "../utils/upper-lower-case-menu-item";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, MatToolbarModule, CustomRemoveDashes, CurrentDateTimePipe, NgIf, RouterLink]
})

export class HeaderComponent {
    public readonly headerItem1: string = 'Главная';
    public readonly headerItem2: string = 'О компании';
    public readonly headerItem3: string = 'Каталог';
    public readonly headerDate: Date = new Date();
    
    public isShowCatalog: boolean = true;
    public isUppercase: boolean = true;
    public menuItems: string[] = menuItems;
    
    public changeMenuText(): boolean {
        this.menuItems = this.isUppercase ? toLowerCaseArray(this.menuItems) : toUpperCaseArray(this.menuItems);
        return (this.isUppercase = !this.isUppercase);
    }
}
