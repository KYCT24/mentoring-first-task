import { Component, inject } from "@angular/core";
import { IUser } from "../../interface/user.interface";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";

@Component({
    selector: "app-delete-user-dialog",
    templateUrl: "./delete-user-dialog.component.html",
    styleUrls: ["./delete-user-dialog.component.scss"],
    standalone: true,
    imports: [MatDialogModule, MatDialogActions, MatButton],
})

export class DeleteUserDialogComponent {
    public readonly data: {user: IUser} = inject<{user: IUser}>(MAT_DIALOG_DATA);
    
    constructor() {
        console.log('Данные, которые приходят в модалку:',this.data);
    }
}