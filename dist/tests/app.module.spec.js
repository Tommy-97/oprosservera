"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const AppModule_1 = require("../AppModule"); // Убедитесь, что путь верный
describe('AppModule', () => {
    let appModule;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [AppModule_1.AppModule],
        }).compile();
        appModule = module.get(AppModule_1.AppModule);
    });
    it('should be defined', () => {
        expect(appModule).toBeDefined();
    });
});
//# sourceMappingURL=app.module.spec.js.map