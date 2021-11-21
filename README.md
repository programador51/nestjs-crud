## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Followed steps to create the project

---

Create the project with `nest new crud-api`

---

Generate the controller `nest generate controller task` (routes)

---

Generate the module `nest generate module task`

---

Generate the service `nest generate service task`

---

Create the folder **`DTO`** to indicate the input/output data when `return/receives` a `request/response`

---

Create the `task.interface.ts` for the typying of `task` (at code level)

---

Enable the `.env` variables to start using external services as database on the cloud, blob files , authentication , etc.

**[Here](https://docs.nestjs.com/techniques/configuration#installation)** it's the guide of documentation

- Install the library
- On the `app.service.ts` import the the configuration as this follows

```typescript
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [... , ConfigModule.forRoot()],
  controllers: [...],
  providers: [...],
})
export class AppModule { }

```

Create the `.env` file on the root of the folder project, now it's usable on any service or controller.

---

**Create the **service** to connect to database (no ORM) with MySQL.**

Save the credentials access db on `.env`
Create the module of DB
Create the service of DB
Create the connection of mysql

---

Enable CORS
`app.enableCors();` on `main.ts`

---

**Create the controller and service of task**
Create the model
Create the service
Create the controller

---

Create the validation for input data, for this, the libraries to use will be the following ones

- `npm i class-validator`
- `npm i class-transformer`
# nestjs-crud
