export class RemoveMembersDto {
    memberIds!: number[];

    constructor(removeMembersDto: RemoveMembersDto) {
        Object.assign(this, removeMembersDto);
    }
}
