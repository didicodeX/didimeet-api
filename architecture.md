```
└── 📁api

    └── 📁node_modules
        └── ...
    └── 📁build
        └── ...
    └── 📁src
        └── 📁config
            └── database.config.ts
        └── 📁controllers
            └── comment.controller.ts
            └── event.controller.ts
            └── user.controller.ts
        └── 📁interfaces
            └── comment.interface.ts
            └── event.interface.ts
            └── index.ts
            └── user.interface.ts
        └── 📁middlewares
            └── validate.middleware.ts
        └── 📁models
            └── comment.model.ts
            └── event.model.ts
            └── user.model.ts
        └── 📁routes
            └── event.route.ts
            └── index.ts
            └── user.route.ts
        └── 📁services
            └── event.service.ts
            └── user.service.ts
        └── 📁utils
            └── event.util.ts
        └── app.ts
        └── main.ts
    └── .env
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.json
```

cd api
$ git init
$ git remote add origin https://github.com/RusselTano/EMS_api.git
$ npm init
$ npm i dotenv express mongoose bcrypt jsonwebtoken cookie-parser cors nodemon
$ npm install -D concurrently typescript
$ npm i --save-dev @types/express

 Récupérer les utilisateurs inscrits à un événement	/event/:eventId/participants	GET
🔍 Récupérer les événements d'un utilisateur	/user/:userId/events	GET
✅ Vérifier si un utilisateur est inscrit	/event/:eventId/user/:userId/check	GET
🔍 Voir événements passés et à venir	/user/:userId/events/status	GET
🔢 Compter le nombre d’inscriptions	/event/:eventId/registrations/count	GET

https://dev.to/alexmercedcoder/mongodb-relationships-using-mongoose-in-nodejs-54cc
https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2
https://dev.to/oluseyeo/how-to-create-relationships-with-mongoose-and-node-js-11c8
https://medium.com/@arif.rahman.rhm/how-to-build-a-rest-api-with-mongodb-and-mongoose-in-node-js-tips-and-tricks-157bfaed33ce

PUT ET PATCH 
https://dev.wanago.io/2021/09/27/api-nestjs-put-patch-mongodb-mongoose/