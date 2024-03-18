# Home Library Service

## Installation

> [!IMPORTANT]
> Please, read the installation instructions carefully.
>
> If you want to use Docker, also read the [Docker](#docker) section.

1. Install Node.js [v20.11.0](https://nodejs.org/en/download)

2. Clone this repository to local computer

    ```bash
    git clone https://github.com/BazhenovYN/nodejs2024Q1-service.git
    ```

3. Navigate to the project directory

    ```bash
    cd nodejs2024Q1-service
    ```

4. Install NPM modules

    ```bash
    npm install
    ```

5. Create a `.env` file based on the provided `.env.template`

    ```bash
    cp .env.template .env
    ```

## Running application

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/docs/>.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

## Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

## Docker

First run (containers startup and database initialization):

```bash
npm run docker:prod
npm run prisma:deploy
```

Running the application in a docker container in PRODUCTION mode:

```bash
npm run docker:prod
```

Running the application in a docker container in DEVELOPMENT mode:

```bash
npm run docker:dev
```

Vulnerability scanning:

```bash
npm run docker:scout:api
npm run docker:scout:db
```

Reset database:

```bash
npm run db:reset
```

## Technologies

Project is created with:

* [NestJS](https://nestjs.com/)
* [Prisma](https://www.prisma.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)
* [Docker](https://www.docker.com/)
* [PostgreSQL](https://www.postgresql.org/)

## License

[MIT](./LICENSE)
