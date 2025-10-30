import dotenv from "dotenv";
dotenv.config();
const sayHello = (name: string) => {
  console.log(`Welcome ${name} to the server!`);
  console.log(process.env.TOKEN);
};

sayHello("Assadi");
