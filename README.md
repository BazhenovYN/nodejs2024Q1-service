# Home Library Service

## Installation

> [!IMPORTANT]
> Please read the installation instructions carefully

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
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

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

## Technologies

Project is created with:

* [NestJS](https://nestjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)

## License

[MIT](./LICENSE)
