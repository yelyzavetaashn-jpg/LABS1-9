function* fibonacciGenerator(a = 0, b = 1) {
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}


const fib = fibonacciGenerator();


console.log("Перші 15 чисел послідовності:");

for (let i = 0; i < 15; i++) {
    console.log(fib.next().value);
}