"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nestjs/core");
var platform_express_1 = require("@nestjs/platform-express");
var express_1 = __importDefault(require("express"));
var app_module_js_1 = require("./app.module.js");
var util_1 = __importDefault(require("util"));
function bootstrap(adapter) {
    return __awaiter(this, void 0, void 0, function () {
        var app, t;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_js_1.AppModule, new platform_express_1.ExpressAdapter(adapter))];
                case 1:
                    app = _a.sent();
                    app.getHttpServer().on('request', function (req, res) {
                        console.log('I am alive2!');
                    });
                    t = app.getHttpAdapter();
                    t.get('/test2', function (req, res) {
                        res.send('Hello Test2!');
                    });
                    return [2 /*return*/, app];
            }
        });
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var app, server, adapter, nest, nestServer;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    app = (0, express_1.default)();
                    server = app.listen(3000, function () {
                        console.log('server started');
                    });
                    server.on('request', function (req, res) {
                        console.log('I am alive!');
                    });
                    app.get('/test', function (req, res) {
                        // If adapter.setHttpServer(server) is NOT called
                        // This route should not work
                        // But it works either way.
                        res.send('Hello Test!');
                    });
                    adapter = new platform_express_1.ExpressAdapter(app);
                    return [4 /*yield*/, bootstrap(adapter)];
                case 1:
                    nest = _d.sent();
                    nestServer = nest.getHttpServer();
                    console.log('Are the servers the same instance?', server === nestServer);
                    // More detailed object inspection
                    console.log('Express Server inspection:', util_1.default.inspect(server, { depth: 0 }));
                    console.log('NestJS Server inspection:', util_1.default.inspect(nestServer, { depth: 0 }));
                    // Try to get some unique identifiers
                    console.log('Server object identities:', {
                        expressServer: {
                            constructor: server.constructor.name,
                            address: server.address(),
                            id: (_a = server._handle) === null || _a === void 0 ? void 0 : _a.fd
                        },
                        nestServer: nestServer ? {
                            constructor: nestServer.constructor.name,
                            address: (_b = nestServer.address) === null || _b === void 0 ? void 0 : _b.call(nestServer),
                            id: (_c = nestServer._handle) === null || _c === void 0 ? void 0 : _c.fd
                        } : 'undefined'
                    });
                    return [4 /*yield*/, nest.init()];
                case 2:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
init();
