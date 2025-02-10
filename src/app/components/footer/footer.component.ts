import { NgFor } from "@angular/common";
import { Component } from "@angular/core";

const menuItems: string[] = ['Главная', 'О компании', 'Каталог', 'Запчасти', 'Интерьер', 'Стиль', 'Партнеры'];
@Component({
    selector: "app-footer",
    standalone: true,
    imports: [NgFor],
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
    public readonly menuItems: string[] = menuItems;
}