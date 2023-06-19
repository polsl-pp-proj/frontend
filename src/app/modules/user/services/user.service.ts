import { Injectable } from '@angular/core';
import { UserApiService } from '../modules/user-api/services/user-api.service';
import { UpdateUserDto } from '../modules/user-api/dtos/update-user.dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private readonly userApiService: UserApiService) {}

    getUsers(page = 1, elementsPerPage = 6) {
        return this.userApiService.getUsers(page, elementsPerPage);
    }

    getUser(userId: number) {
        return this.userApiService.getUser(userId);
    }

    updateUser(userId: number, updateUserDto: UpdateUserDto) {
        return this.userApiService.updateUser(userId, updateUserDto);
    }

    removeUser(userId: number) {
        return this.userApiService.removeUser(userId);
    }
}
