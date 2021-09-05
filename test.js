A = [ "banana", "apple", "lemon"]
B = ["banana", "lemon"]

const [C,...E] = A;

//C = [...A,...B]
console.log(E);