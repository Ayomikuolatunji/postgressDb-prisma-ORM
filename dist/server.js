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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const response_time_1 = __importDefault(require("response-time"));
const requestHeaders_1 = __importDefault(require("./middleware/requestHeaders"));
const requestErrorHandle_1 = __importDefault(require("./middleware/requestErrorHandle"));
const _404Page_1 = require("./middleware/404Page");
const users_route_1 = __importDefault(require("./routes/users.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// convert request to json using express middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// active cors policy for client accessibility
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.options("*", (0, cors_1.default)());
app.use((0, compression_1.default)());
// client request headers
app.use(requestHeaders_1.default);
app.use((0, response_time_1.default)());
app.use("v1/api/", users_route_1.default);
// page not found
app.use(_404Page_1.pageNotFound);
// express client error handle
app.use(requestErrorHandle_1.default);
// connecting server
(function startConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`App running on port ${process.env.PORT}`);
            });
        }
        catch (error) {
            console.log(error.message);
        }
    });
})();
