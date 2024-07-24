import {readdirSync, writeFile} from 'fs';
import * as path from 'path';

export const localIconNames: string[] = [];

export function getLocalIconNames(dir: string, prefix = '') {
    const dirents = readdirSync(dir, {
        withFileTypes: true,
    });
    for (const dirent of dirents) {
        if (dirent.isDirectory()) {
            getLocalIconNames(dir + dirent.name + '/', dirent.name);
        } else {
            localIconNames.push(prefix + dirent.name.replace('.svg', ''));
        }
    }
}

export function buildLocalIconNames() {
    getLocalIconNames(path.resolve(__dirname, "../icons/"));
    writeFile(path.resolve(__dirname, "./iconNames.ts"), 'export default ' + JSON.stringify(localIconNames), 'utf-8',
        (err) => {
            if (err) throw err;
        });
}
