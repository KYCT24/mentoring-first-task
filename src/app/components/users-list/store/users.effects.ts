import { inject } from "@angular/core";
import { IUser } from "../../interface/user.interface";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersApiService } from "../../service/users-api.service";
import { UsersActions } from "./users.actions";
import { catchError, map, of, switchMap } from "rxjs";

export const LoadUsers = createEffect(
    (action$ = inject(Actions), usersService: UsersApiService = inject(UsersApiService)) => {
        return action$.pipe(
            ofType(UsersActions.load),
            switchMap(() =>
                usersService.getUsers().pipe(
                    map((users: IUser[]) => UsersActions.loadSuccess({ users })),
                    catchError((error) => of(UsersActions.loadFailure({ error })))
                ))
        )
    },
    { functional: true }
)
