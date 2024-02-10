"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/passport.ts
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const passport_local_1 = require("passport-local");
passport_1.default.use(new passport_local_1.Strategy(async (username, password, done) => {
    try {
        const user = await user_1.default.findOne({ where: { userName: username } });
        console.log(user);
        if (!user || user.getDataValue("passWord") !== password) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    user_1.default.findByPk(id)
        .then((user) => {
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    })
        .catch((err) => done(err));
});
//# sourceMappingURL=passport.js.map