
function* fibonacciGenerator(a = 0, b = 1) {
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

function consumeIteratorWithTimeout(iterator, timeoutSeconds) {
    const timeoutMilliseconds = timeoutSeconds * 1000;
    const startTime = Date.now();

    let sum = 0;
    let count = 0;

    const interval = setInterval(() => {
        const currentTime = Date.now();

        
        if (currentTime - startTime >= timeoutMilliseconds) {
            clearInterval(interval);
            console.log("Тайм-аут завершено");
            console.log("Загальна кількість чисел:", count);
            console.log("Сума:", sum);
            console.log("Середнє:", count > 0 ? sum / count : 0);
            return;
        }

        const value = iterator.next().value;

        sum += value;
        count++;

        console.log(`Значення: ${value} | Поточна сума: ${sum} | Середнє: ${sum / count}`);
    }, 500); 
}


const fib = fibonacciGenerator();

consumeIteratorWithTimeout(fib, 5);