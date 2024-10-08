// create a function that generates a random employee id , it should be random numbers , 6 digits , and it should be unique
export function generateEmployeeId() {
  return Math.floor(Math.random() * 1000000).toString();
}
