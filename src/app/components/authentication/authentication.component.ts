import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialogClose } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";


@Component ({
    selector: 'app-authentication',
    standalone: true,
    imports: [MatButton, MatDialogClose, MatIcon, MatTooltip],
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent { }
