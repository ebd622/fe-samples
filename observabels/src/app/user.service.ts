import {EventEmitter, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'}) // It is a shortcut how to use "provided"
export class UserService {
    activatedEmmiter = new EventEmitter<boolean>()

}