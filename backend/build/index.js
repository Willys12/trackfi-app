"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 7000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const mongoDB = process.env.MONGODB_URI;
mongoose_1.default.connect(mongoDB)
    .then(() => console.log("Connected to database!"))
    .catch((err) => (console.error("Failed to connect to database!", err)));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
