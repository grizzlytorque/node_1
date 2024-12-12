import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import {access, constants, writeFile, readFile} from 'fs/promises';
//import.meta-metadata about current file
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
const jsonFile=join(__dirname, 'feeds.json');

export async function getLinks(){
    try{
        await access(jsonFile, constants.F_OK);//R_OK,W_OK,X_OK
    } catch(error) {
        await writeFile(jsonFile, JSON.stringify([]));//utf8 by writing, you essentially create it
    }

    const contents=await readFile(jsonFile, {encoding: 'utf8'});
    return JSON.parse(contents);
}

export async function saveLinks(links){
    await writeFile(jsonFile, JSON.stringify(links))
}