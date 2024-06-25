"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PollingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollingService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const schedule_1 = require("@nestjs/schedule");
const rxjs_1 = require("rxjs");
const axios_retry_1 = __importDefault(require("axios-retry"));
let PollingService = PollingService_1 = class PollingService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(PollingService_1.name);
        (0, axios_retry_1.default)(this.httpService.axiosRef, {
            retries: 3,
            retryDelay: (retryCount) => {
                this.logger.warn(`Retry attempt ${retryCount}`);
                return retryCount * 1000;
            },
            retryCondition: (error) => {
                return axios_retry_1.default.isNetworkOrIdempotentRequestError(error);
            },
        });
    }
    async handleCron() {
        this.logger.debug('Starting API polling...');
        try {
            const accounts = await this.getAccounts();
            for (const account of accounts) {
                await this.pollAccount(account);
            }
            this.logger.debug('Finished API polling');
        }
        catch (error) {
            this.logger.error('Error during API polling', error);
        }
    }
    async getAccounts() {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get('http://example.com/api/accounts'));
            this.logger.debug(`Fetched accounts: ${response.data.length}`);
            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to fetch accounts', error);
            throw new Error('Failed to fetch accounts');
        }
    }
    async pollAccount(account) {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`http://example.com/api/account/${account.id}/status`));
            this.logger.debug(`Account ${account.id} status: ${response.data.status}`);
        }
        catch (error) {
            this.logger.error(`Failed to poll account ${account.id}`, error);
            // If you need to propagate the error further, uncomment the line below
            // throw new Error(`Failed to poll account ${account.id}`);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('0 * * * * *') // Every minute
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PollingService.prototype, "handleCron", null);
PollingService = PollingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PollingService);
exports.PollingService = PollingService;
//# sourceMappingURL=PollingService.js.map