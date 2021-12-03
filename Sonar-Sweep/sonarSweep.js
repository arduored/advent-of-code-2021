//TODO: Count the number of times a depth measurement increases from the previous measurement.
const fs = require('fs')

function countIncreases(data) {
    let counter = 0;
    let prev = null;

    for(const depth of data){
        if(!prev){
            console.log(`${depth}: (N/A - no previous measurement)`)
        } else if(parseInt(depth) > prev){
            console.log(`${depth} : (increased)`);
            counter++;
        }else{
            console.log(`${depth} : (decreased)`)
        }
        prev = parseInt(depth);
    }
    return counter;
}


function main() {
    console.log("START")
    let data = null;
    try{
        const content = fs.readFileSync("input.txt", 'utf-8');
        data = content.split("\n");

        console.log(`Number of measurements: ${data.length}`);

        const increases = countIncreases(data);

        console.log(`Total increases = ${increases}`);
    }catch(err){
        console.error(err)
    }

    console.log("END");
}

main()