import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'}) // It is a shortcut how to use "provided"
export class UserService {
    activatedEmmiter = new Subject<boolean>()

}