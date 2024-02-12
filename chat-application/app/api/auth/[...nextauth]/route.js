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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = exports.authOptions = void 0;
var bcrypt_1 = require("bcrypt");
var next_auth_1 = require("next-auth");
var credentials_1 = require("next-auth/providers/credentials");
var github_1 = require("next-auth/providers/github");
var google_1 = require("next-auth/providers/google");
var prisma_adapter_1 = require("@next-auth/prisma-adapter");
var prismadb_1 = require("../../../(libs)/prismadb");
exports.authOptions = {
    adapter: (0, prisma_adapter_1.PrismaAdapter)(prismadb_1.default),
    providers: [
        (0, github_1.default)({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        (0, google_1.default)({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        (0, credentials_1.default)({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: function (credentials) {
                return __awaiter(this, void 0, void 0, function () {
                    var user, isCorrectPassword;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(credentials === null || credentials === void 0 ? void 0 : credentials.email) || !(credentials === null || credentials === void 0 ? void 0 : credentials.password)) {
                                    throw new Error("Invalid credentials");
                                }
                                return [4 /*yield*/, prismadb_1.default.user.findUnique({
                                        where: {
                                            email: credentials.email,
                                        },
                                    })];
                            case 1:
                                user = _a.sent();
                                if (!user || !(user === null || user === void 0 ? void 0 : user.hashedPassword)) {
                                    throw new Error("Invalid credentials");
                                }
                                return [4 /*yield*/, bcrypt_1.default.compare(credentials.password, user.hashedPassword)];
                            case 2:
                                isCorrectPassword = _a.sent();
                                if (!isCorrectPassword) {
                                    throw new Error("Invalid credentials");
                                }
                                return [2 /*return*/, user];
                        }
                    });
                });
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
var handler = (0, next_auth_1.default)(exports.authOptions);
exports.GET = handler;
exports.POST = handler;
