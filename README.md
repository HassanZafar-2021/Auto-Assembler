# Auto-Assembler

## Description

- 08 TypeScript and OOP: Vehicle Builder for challenge submission
- Project was built with using TypeScript with OOP, and utilities such as inquirer package from node modules
- I solved the problem of engaging user activity via cli
- The user can learn more about OOP and how to answer each vehicle prompt when granted

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Video](#video)

## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

1. First do npm i typescript inquirer to install appropriate dependencies.
2. Configure and optimize tsconfig.ts file and make sure to include npm run build/start in package.JSON
3. Work all the truck, motorbike, car, vehicle, and cli files with OOP paradigm and interface alignment.
4. run command line using npm run start to answer question prompts

## Usage

npm install -g typescript
node dist/index.js
Welcome to the Vehicle Builder CLI!
Choose an option:

1. Create a new vehicle
2. View saved vehicles
3. Exit
   > Select vehicle type: Car
   > Enter make: Tesla
   > Enter model: Model S
   > Enter color: Red
   > Vehicle created: Tesla Model S (Red)

## Credits

No collaborators

## License

MIT License

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)

![License](https://img.shields.io/badge/license-MIT-blue)

## Features

Interactive command-line interface (CLI) for vehicle management.
Object-oriented programming (OOP) architecture for clean and scalable design.
Customizable vehicle builder with attributes like make, model, and color.
Save and load vehicle configurations using JSON.
Supports multiple vehicle types: cars, bikes, trucks.
Real-time validation of user input through Inquirer.js.

## How to Contribute

Fork & Clone repo to work on any feature and make your own branch with commits and push via pull request.

## Tests

make tests folder and use command npm test

## Video

https://www.youtube.com/watch?v=ifobh4HhCFg
