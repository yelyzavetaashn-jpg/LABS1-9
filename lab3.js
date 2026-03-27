function memoize(fn, options = {}) {
    const cache = new Map();

    const maxSize = options.maxSize || Infinity;
    const strategy = options.strategy || "LRU"; 
    const ttl = options.ttl || null; 

    function memoized(...args) {
        const key = JSON.stringify(args);

        
        if (cache.has(key)) {
            const item = cache.get(key);

            
            if (ttl && Date.now() - item.time > ttl) {
                cache.delete(key);
            } else {
                item.freq++;
                item.time = Date.now();
                console.log("кешу", key);
                return item.value;
            }
        }

        
        console.log("Обчислення", key);
        const result = fn(...args);

        
        if (cache.size >= maxSize) {
            removeItem();
        }

        
        cache.set(key, {
            value: result,
            freq: 1,
            time: Date.now()
        });

        return result;
    }

    function removeItem() {
        let keyToDelete;

        if (strategy === "LRU") {
            let oldest = Infinity;
            for (let [key, val] of cache) {
                if (val.time < oldest) {
                    oldest = val.time;
                    keyToDelete = key;
                }
            }
        } else if (strategy === "LFU") {
            let minFreq = Infinity;
            for (let [key, val] of cache) {
                if (val.freq < minFreq) {
                    minFreq = val.freq;
                    keyToDelete = key;
                }
            }
        }

        console.log("Видалення з кешу", keyToDelete);
        cache.delete(keyToDelete);
    }

    return memoized;
}

function slowMultiply(a, b) {
    for (let i = 0; i < 1e7; i++) {} 
    return a * b;
}

const fastMultiply = memoize(slowMultiply, {
    maxSize: 2,
    strategy: "LRU",
    ttl: 10000 
});

console.log(fastMultiply(2, 3)); 
console.log(fastMultiply(2, 3)); 
console.log(fastMultiply(4, 5)); 
console.log(fastMultiply(6, 7)); 
console.log(fastMultiply(2, 3)); 