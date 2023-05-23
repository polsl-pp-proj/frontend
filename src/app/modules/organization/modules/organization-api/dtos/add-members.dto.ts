import { MemberDto } from './member.dto';

export class AddMembersDto {
    memebers!: MemberDto[];

    constructor(addMembersDto: AddMembersDto) {
        Object.assign(this, addMembersDto);
    }
}
