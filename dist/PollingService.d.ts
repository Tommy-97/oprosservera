import { HttpService } from '@nestjs/axios';
export declare class PollingService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    handleCron(): Promise<void>;
    private getAccounts;
    private pollAccount;
}
