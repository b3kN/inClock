'use strict';

import * as express from 'express';
import user = require('../models/user.model');
import User = user.User;
import UserDocument = user.UsersDocument;
import Users = user.Users;

import Router from './router';

module Route {
  export class Routes extends Router {
    constructor(app: express.Application, router: express.Router) {
      super(app, router, Users);
      this.config();
    }

    private config() {
      let router = super.getRouter();
      router.route('/user')
        .get((req: express.Request,
              res: express.Response,
              next: express.NextFunction) => {
          super.get(req, res, next);
        })
        .post((req: express.Request,
               res: express.Response,
               next: express.NextFunction) => {
          let user = new User({ username: req.body.username,
                                password: req.body.password });
          super.create(req, res, next, user);
        });

      router.route('/user/:user_id')
        .get((req: express.Request,
              res: express.Response,
              next: express.NextFunction) => {
          let id = { _id: req.params.user_id };
          super.getOne(req, res, next, id);
        })
        .delete((req: express.Request,
                 res: express.Response,
                 next: express.NextFunction) => {
         let id = { _id: req.params.user_id };
         super.deleteOne(req, res, next, id);
       })
       .put((req: express.Request,
             res: express.Response,
             next: express.NextFunction) => {
         let id = { _id: req.params.user_id };
         let mod = (user) => {
           if (req.body.username)
               user.username = req.body.username;

           if (req.body.password)
               user.password = req.body.password;
         };
         super.updateOne(req, res, next, id, mod);
       });
    }
  }
}

export = Route;
