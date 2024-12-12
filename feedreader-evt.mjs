import {getLinks, saveLinks} from './feed-manager.mjs';
import { rl, close } from './rl.mjs';
import axios from 'axios';
import Parser from 'rss-parser';
import {EventEmitter} from 'events';

const feeds=await getLinks();
const parser=new Parser();

function prompt(){
    rl.setPrompt('Enter: ');
    rl.prompt();
}

rl.on('line', input=>{
    let cmdParts=input.trim().split(' ');
});

let input=await question('Enter: ');
while(input!=='quit'){
    let cmdParts=input.trim().split(' ');
    let cmd=cmdParts[0];
    //list
    if(cmd==='list'){
        feeds.forEach((url, idx) => console.log(`${idx}\t${url}`));
    }
    //add url
    if(cmd==='add'){
        if(cmdParts.length<2){
            console.log('No arguments');
        } else {
            feeds.push(cmdParts[1]);
            saveLinks(feeds)
        }
    }
    //del idx
    if(cmd==='del'){
        if(cmdParts.length<2){
            console.log('No arguments');
        } else {
            let idx=parseInt(cmdParts[1], 10);
            if(idx>-1 && idx<feeds.length){
                feeds.splice(idx, 1);
                saveLinks(feeds)
            } else {
                console.log('idx out of range');
            }
        }
    }
    //read idx
    if(cmd==='read'){
        if(cmdParts.length<2){
            console.log('No arguments');
        } else {
            let idx=parseInt(cmdParts[1], 10);
            if(idx>-1 && idx<feeds.length){
                let {data}=await axios.get('https://www.reddit.com/r/node.rss')
                // console.log(data)
                let feed=await parser.parseString(data);
                feed.items.forEach(item=>console.log(item.title))
            } else {
                console.log('idx out of range');
            }
        }
    }
    input=await question('Enter: ');
}
close();