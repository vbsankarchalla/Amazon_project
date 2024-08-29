class Car {
  #brand;
  #model;
  speed = 0;
  maxspeed = 200;
  isTrunkOpen = true;

  constructor (details) {
    this.#brand = details.brand;
    this.#model = details.model;
  }

  displayInfo() {
    console.log(`${this.#brand}  ${this.#model}, speed : ${this.speed}
      isTrunkOpend : ${this.isTrunkOpen}`);
  }

  go () {
    this.isCarStopped();
    if(this.speed <= 195 && this.speed >= 0)
    this.speed += 5;
  }

  break () {
    this.isCarStopped();
    if(this.speed >= 5)
    this.speed -= 5;
  }

  isCarStopped() {
    (this.speed = 0) ?
      this.openTrunk()  :
      this.closeTrunk() ;
  }

  openTrunk() {
    this.isTrunkOpen = true
  }

  closeTrunk() {
    this.isTrunkOpen = false
  }
}

class RacingCar extends Car{
  acceleration;
  maxspeed = 300;

  constructor (specs) {
    super(specs);
    this.acceleration = specs.acceleration;
  }

  go() {
    this.isCarStopped();
    if(this.speed <= (this.maxspeed - this.acceleration) && this.speed >= 0)
    this.speed += this.acceleration;
  }
  
}

let car1 = new Car({brand : 'Toyota', model : 'Corolla'});
let car2 = new Car({brand : 'Tesla', model : 'Model 3'});
let car3 = new RacingCar({brand : 'McLaren', model : 'F1', acceleration: 20});

car1.displayInfo();
car1.break();
car1.go();
car1.go();
car1.go();

car2.displayInfo();
car2.break();
car2.go();
car2.go();
car2.go();

car3.displayInfo();
car3.break();
car3.go();
car3.go();
car3.go();

car1.displayInfo();
car2.displayInfo();
car3.displayInfo();