"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollingModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const schedule_1 = require("@nestjs/schedule");
const PollingService_1 = require("./PollingService"); // Ensure this path is correct
const global_exceptions_filter_1 = require("./global-exceptions.filter"); // Ensure this path is correct
let PollingModule = class PollingModule {
};
PollingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            axios_1.HttpModule,
        ],
        providers: [
            PollingService_1.PollingService,
            {
                provide: 'EXCEPTION_FILTER',
                useClass: global_exceptions_filter_1.GlobalExceptionsFilter,
            },
        ],
    })
], PollingModule);
exports.PollingModule = PollingModule;
//# sourceMappingURL=PollingModule.js.map