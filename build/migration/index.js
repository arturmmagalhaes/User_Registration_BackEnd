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
const UserTable_1 = require("./UserTable");
const dotenv_1 = __importDefault(require("dotenv"));
const PhoneTable_1 = require("./PhoneTable");
const AddressTable_1 = require("./AddressTable");
const AmountTable_1 = require("./AmountTable");
dotenv_1.default.config();
const user = new UserTable_1.UserTable();
const phone = new PhoneTable_1.PhoneTable();
const address = new AddressTable_1.AddressTable();
const amount = new AmountTable_1.AmountTable();
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.createTable();
        yield phone.createTable();
        yield address.createTable();
        yield amount.createTable();
    });
}
createTables();