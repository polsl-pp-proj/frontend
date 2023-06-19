import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { SimpleUserDto, UserDto } from '../dtos/user.dto';
import { userApiRoutes } from '../user-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { HttpParams } from '@angular/common/http';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable({
    providedIn: 'root',
})
export class UserApiService {
    constructor(private readonly apiService: CoreApiService) {}

    getUsers(page: number, elementsPerPage: number) {
        return this.apiService.request<SimpleUserDto[]>(
            userApiRoutes.GET_users,
            new ApiOptions({
                params: new HttpParams({
                    fromObject: {
                        ...new PaginationDto({ elementsPerPage, page }),
                    },
                }),
            }) as ApiOptionsBody
        );
    }

    getUser(userId: number) {
        return this.apiService.request<UserDto>(
            userApiRoutes.GET_user,
            new ApiOptions({ routeParams: { userId } }) as ApiOptionsBody
        );
    }

    updateUser(userId: number, updateUserDto: UpdateUserDto) {
        return this.apiService.request<UpdateUserDto, void>(
            userApiRoutes.PATCH_updateUser,
            updateUserDto,
            new ApiOptions({ routeParams: { userId } }) as ApiOptionsBody
        );
    }

    removeUser(userId: number) {
        return this.apiService.request<void>(
            userApiRoutes.DELETE_removeUser,
            new ApiOptions({ routeParams: { userId } }) as ApiOptionsBody
        );
    }
}
