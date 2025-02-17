import { NgIf } from "@angular/common";
import { Component} from "@angular/core";

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [NgIf],
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
    public showImage: boolean = true
}
