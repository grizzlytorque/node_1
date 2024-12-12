import * as readline from 'readline';
import {stdin as input, stdout as output} from 'process';

const rl = readline.createInterface({ input, output});
let answer = await rl.question('Enter: ');

while(answer!=='quit'){
    try{
        const value = eval(input);
        console.log(`${value}`);
    } catch (exception){
        console.log('No evaluation')
    }
}

rl.close();