import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IUser, ICreateUser } from "../../interface/user.interface";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'load': emptyProps,
        'loadSuccess': props<{ users: IUser[] }>(),
        'loadFailure': props<{ error: { message: string } }>(),
        'edit': props<{ user: IUser }>(),
        'create': props<{ user: ICreateUser }>(),
        'delete': props<{ id: number }>(),
    }
})
