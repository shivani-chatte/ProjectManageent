import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';

const bcrypt = require ('bcrypt');

@Injectable()
export class AuthService{

    hashPassword(password : String): Observable<String>{
        return from<String>(bcrypt.hash(password, 10));
    }

    comparePassword(password : String, storePasswordHash : String): Observable<String> {
        return from<String>(bcrypt.compare(password, storePasswordHash));
    }

}
