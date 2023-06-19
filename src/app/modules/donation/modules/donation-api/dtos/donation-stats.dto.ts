import { FunderDto } from './funder.dto';

export class DonationStatsDto {
    raised!: {
        lastMonth: number;
        total: number;
    };
    lastFunders!: FunderDto[];
}
