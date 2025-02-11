import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialogClose } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";


@Component ({
    selector: 'app-logout',
    standalone: true,
    imports: [MatButton, MatDialogClose, MatIcon, MatTooltip],
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class logoutComponent { }
