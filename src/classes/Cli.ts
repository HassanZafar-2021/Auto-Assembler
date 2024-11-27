import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
// TODO add the necessary import statements for the Truck, Car, Motorbike, and Wheel classes
class Cli {
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well
  vehicles: (Car | Truck | Motorbike)[];
  //TODO: You will need to use the Union operator to define additional types for the array
  // TODO: See the AbleToTow interface for an example of how to use the Union operator
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Example of a type guard
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // Set the selectedVehicleVin to the VIN of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // Perform actions on the selected vehicle
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          // TODO: Update the choices array to include Truck and Motorbike
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") this.createCar();
        else if (answers.vehicleType === "Truck") this.createTruck();
        else if (answers.vehicleType === "Motorbike") this.createMotorbike();
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          // TODO: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        {
          type: "input",
          name: "towingCapacity",
          message: "Enter Towing Capacity",
        },
      ])

      .then((answers) => {
        // TODO: Use the answers object to pass the required properties to the Truck constructor
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );

        // TODO: push the truck to the vehicles array
        this.vehicles.push(truck);

        // TODO: set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;

        // TODO: perform actions on the truck
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        {
          type: "input",
          name: "frontWheelDiameter",
          message: "Enter Front Wheel Diameter",
        },
        {
          type: "input",
          name: "frontWheelBrand",
          message: "Enter Front Wheel Brand",
        },
        {
          type: "input",
          name: "rearWheelDiameter",
          message: "Enter Rear Wheel Diameter",
        },
        {
          type: "input",
          name: "rearWheelBrand",
          message: "Enter Rear Wheel Brand",
        },
      ])
      .then((answers) => {
        // TODO: Use the answers object to pass the required properties to the Motorbike constructor
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(
              parseInt(answers.frontWheelDiameter),
              answers.frontWheelBrand
            ),
            new Wheel(
              parseInt(answers.rearWheelDiameter),
              answers.rearWheelBrand
            ),
          ]
        );
        // TODO: Push the motorbike to the vehicles array
        this.vehicles.push(motorbike);

        // TODO: Set the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;

        // TODO: Perform actions on the motorbike
        this.performActions();
      });
  }
  // TODO: add a parameter to accept a truck object
  findVehicleToTow(truck: Truck): void {
    // Prompt user to select any vehicle
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTowVin",
          message: "Select a vehicle to tow:",
          choices: this.vehicles.map((v) => ({
            name: `${v.vin} -- ${v.make} ${v.model}`,
            value: v.vin,
          })),
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          (v) => v.vin === answers.vehicleToTowVin
        );

        if (!selectedVehicle) {
          console.log("Selected vehicle could not be found.");
          this.performActions(); // Call the next action
          return;
        }

        if (selectedVehicle.vin === truck.vin) {
          console.log("A truck cannot tow itself.");
        } else if (selectedVehicle instanceof Truck) {
          console.log("A truck cannot tow another truck.");
        } else {
          truck.tow(selectedVehicle);
        }

        // Proceed with further actions
        this.performActions();
      })
      .catch((error) => {
        console.error("Error selecting a vehicle to tow:", error);
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          // TODO: add options to tow and wheelie
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow a vehicle",
            "Perform a wheelie",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === "Print details") {
          // find the selected vehicle and print its details
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              vehicle.printDetails();
            }
          });
        } else if (answers.action === "Start vehicle") {
          // find the selected vehicle and start it
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              vehicle.start();
            }
          });
        } else if (answers.action === "Accelerate 5 MPH") {
          // find the selected vehicle and accelerate it by 5 MPH
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              vehicle.accelerate(5);
            }
          });
        } else if (answers.action === "Decelerate 5 MPH") {
          // find the selected vehicle and decelerate it by 5 MPH
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              vehicle.decelerate(5);
            }
          });
        } else if (answers.action === "Stop vehicle") {
          // find the selected vehicle and stop it
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              vehicle.stop();
            }
          });
        } else if (answers.action === "Turn right") {
          // find the selected vehicle and turn it right
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              vehicle.turn("right");
            }
          });
        } else if (answers.action === "Turn left") {
          // find the selected vehicle and turn it left
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              vehicle.turn("left");
            }
          });
        } else if (answers.action === "Reverse") {
          // find the selected vehicle and reverse it
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              vehicle.reverse();
            }
          });
        }

        // TODO: add statements to perform the tow action only if the selected vehicle is a truck. Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument. After calling the findVehicleToTow method, you will need to return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous.
        else if (answers.action === "Tow a vehicle") {
          const selectedVehicle = this.vehicles.find(
            (vehicle) => vehicle.vin === this.selectedVehicleVin
          );

          if (!selectedVehicle) {
            console.log("Selected vehicle could not be found.");
            return;
          }

          if (selectedVehicle instanceof Truck) {
            this.findVehicleToTow(selectedVehicle as Truck);
            return; // Ensure we exit the current function to avoid calling performActions prematurely
          } else {
            console.log("This vehicle cannot tow.");
          }
        }

        // TODO: add statements to perform the wheelie action only if the selected vehicle is a motorbike
        else if (answers.action === "Perform a wheelie") {
          this.vehicles.forEach((vehicle) => {
            if (vehicle.vin === this.selectedVehicleVin) {
              if (vehicle instanceof Motorbike) {
                (vehicle as Motorbike).wheelie();
              } else {
                console.log(`This vehicle cannot wheelie.`);
              }
            }
          });
        } else if (answers.action === "Select or create another vehicle") {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;


