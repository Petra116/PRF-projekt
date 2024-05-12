import { Router, Request, Response, NextFunction } from 'express'
import { MainClass } from '../main-class'
import { PassportStatic } from 'passport'
import { User } from '../model/User'
import { Product } from '../model/Product'
import { Producer } from '../model/Producer'
import { Event } from '../model/Event'


export const configureRoutes = (passport:PassportStatic, router: Router): Router => {
    router.get('/', (req: Request, res: Response) =>{
        let myClass = new MainClass();
        res.status(200).send('Hello, World!');
    })

    router.get('/callback', (req: Request, res: Response) =>{
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if(error){
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        });
    })

    router.get('/promise', async(req: Request, res: Response) =>{
        let myClass = new MainClass();
        /*myClass.monitoringPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(400).end();
        });*/

        //async-await (4.video)
        try{
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch(error){
            res.write(error);
            res.status(400).end();
        }
    })

    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset = UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        myClass.monitoringObservable().subscribe({
            next(data: string) {
                res.write(data);
            }, error(error: string){
                //res.write(error);
                res.status(400).end(error);
            }, complete(){
                res.status(200).end();
            }
        });
    })

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if(error){
                console.log(error);
                res.status(500).send(error);
            } else{
                if(!user){
                    res.status(400).send('User not found.');
                } else{
                    req.login(user, (err: string | null) => {
                        if(err){
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else{
                            res.status(200).send(user);
                        }
                    });
                }
            }
        }) (req, res, next);
    })

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const name = req.body.name;
        const address = req.body.address;
        const phone = req.body.phone;
        const password = req.body.password;
        const user = new User({email: email, name: name, address: address, phone: phone, title: "consumer", password: password});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    })

    router.post('/logout', (req: Request, res:Response) => {
        if(req.isAuthenticated()){
            req.logout((error) => {
                if(error){
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else{
            res.status(500).send('User is not logged in.');
        }
    })

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else{
            res.status(500).send('User is not logged in.');
        }
    })

    router.get('/checkAuth', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    })

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else{
            res.status(500).send('User is not logged in.');
        }
    })

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if(req.isAuthenticated()){
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else{
            res.status(500).send('User is not logged in.');
        }
    })

    router.post('/addProduct', (req: Request, res: Response) => {
        const name = req.body.name;
        const producer = req.body.producer;
        const price = req.body.price;
        const quantity = req.body.quantity;
        const origin = req.body.origin;
        const preorder = req.body.preorder;
        const delivery = req.body.delivery;
        const availability = req.body.availability;
        const discount = req.body.discount;

        const product = new Product({name: name, producer: producer, price: price, quantity: quantity, origin: origin, preorder: preorder, delivery: delivery, availability: availability, discount: discount});
        product.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    })

    router.get('/getAllProducts', (req: Request, res: Response) => {
        const query = Product.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    })

    router.post('/registerProducer', (req: Request, res: Response) => {
        const email = req.body.email;
        const name = req.body.name;
        const address = req.body.address;
        const phone = req.body.phone;
        const password = req.body.password;
        const producer = new Producer({email: email, name: name, address: address, phone: phone, title: "producer", password: password});
        producer.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    })

    router.post('/addEvent', (req: Request, res: Response) => {
        const name = req.body.name;
        const place = req.body.place;
        const date = req.body.date;
        const time = req.body.time;
        const organizer= req.body.organizer;
        const price = req.body.price;
        const capacity = req.body.capacity;

        const event = new Event({name: name, place: place, date: date, time: time, organizer: organizer, price: price, capacity: capacity});
        event.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    })

    router.get('/getAllEvents', (req: Request, res: Response) => {
        const query = Event.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    })

    router.get('/getAllProducers', (req: Request, res: Response) => {
        const query = Producer.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    })

    /*router.get('/getMyProducts', (req: Request, res: Response) => {
        const name = req.query.name;
        const query = Product.find({producer:name});
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    })*/

    return router;
}
