"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_local_1 = require("passport-local");
const User_1 = require("../model/User");
const Producer_1 = require("../model/Producer");
const configurePassport = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('User is serialized.');
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log('User is deserialized.');
        done(null, user);
    });
    passport.use('local', new passport_local_1.Strategy((username, password, done) => {
        /*const query = User.findOne({email: username});
        query.then(user => {
            if(user){
                user.comparePassword(password, (error, _) => {
                    if(error){
                        done('Incorrect username or password.');
                    }else {
                        done(null, user._id);
                    }
                });
            } else{
                done(null, undefined);
            }
        }).catch(error => {
            done(error);
        })*/
        const query = User_1.User.findOne({ email: username });
        const query2 = Producer_1.Producer.findOne({ email: username });
        query.then(user => {
            if (user) {
                user.comparePassword(password, (error, _) => {
                    if (error) {
                        done('Incorrect username or password.');
                    }
                    else {
                        done(null, user._id);
                    }
                });
            }
            else
                query2.then(user => {
                    if (user) {
                        user.comparePassword(password, (error, _) => {
                            if (error) {
                                done('Incorrect username or password.');
                            }
                            else {
                                done(null, user._id);
                            }
                        });
                    }
                });
        }).catch(error => {
            done(error);
        });
    }));
    return passport;
};
exports.configurePassport = configurePassport;
