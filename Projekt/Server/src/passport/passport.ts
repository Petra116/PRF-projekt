import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { User } from '../model/User'; 
import { Producer } from '../model/Producer';

export const configurePassport = (passport: PassportStatic): PassportStatic => {
    
    passport.serializeUser((user: Express.User, done) => {
        console.log('User is serialized.');
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('User is deserialized.');
        done(null, user);
    });

    passport.use('local', new Strategy((username, password, done) => {
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
        
        const query = User.findOne({email: username});
        const query2 = Producer.findOne({email: username});
        query.then(user => {
            if(user){
                user.comparePassword(password, (error, _) => {
                    if(error){
                        done('Incorrect username or password.');
                    }
                    else{
                        done(null, user._id);
                    }
                });
            } else query2.then(user => {
                if(user){
                    user.comparePassword(password, (error, _) => {
                        if(error){
                            done('Incorrect username or password.');
                        } else {
                            done(null, user._id);
                        }
                    })
                }
            });
        }).catch (error => {
            done(error);
        })
    }));
    
    return passport;
}