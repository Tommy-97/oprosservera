import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import axiosRetry from 'axios-retry';

interface Account {
  id: string;
  // Add other account properties as needed
}

@Injectable()
export class PollingService {
  private readonly logger = new Logger(PollingService.name);

  constructor(private readonly httpService: HttpService) {
    axiosRetry(this.httpService.axiosRef, {
      retries: 3,
      retryDelay: (retryCount: number) => {
        this.logger.warn(`Retry attempt ${retryCount}`);
        return retryCount * 1000;
      },
      retryCondition: (error: any) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
      },
    });
  }

  @Cron('0 * * * * *') // Every minute
  async handleCron(): Promise<void> {
    this.logger.debug('Starting API polling...');
    try {
      const accounts = await this.getAccounts();
      for (const account of accounts) {
        await this.pollAccount(account);
      }
      this.logger.debug('Finished API polling');
    } catch (error) {
      this.logger.error('Error during API polling', error);
    }
  }

  private async getAccounts(): Promise<Account[]> {
    try {
      const response = await lastValueFrom(this.httpService.get<Account[]>('http://example.com/api/accounts'));
      this.logger.debug(`Fetched accounts: ${response.data.length}`);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch accounts', error);
      throw new Error('Failed to fetch accounts');
    }
  }

  private async pollAccount(account: Account): Promise<void> {
    try {
      const response = await lastValueFrom(this.httpService.get<{ status: string }>(`http://example.com/api/account/${account.id}/status`));
      this.logger.debug(`Account ${account.id} status: ${response.data.status}`);
    } catch (error) {
      this.logger.error(`Failed to poll account ${account.id}`, error);
      // If you need to propagate the error further, uncomment the line below
      // throw new Error(`Failed to poll account ${account.id}`);
    }
  }
}
