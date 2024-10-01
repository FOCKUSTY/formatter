import { exit } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';

type MiniPathType = {
    source: {
        name: string,
        path: string
    },
    build: {
        name: string,
        path: string
    }
};

type PathType = { [key: string]: MiniPathType };

const defaultFiles: PathType = {
    'package.json': {
        build: {
            name: 'package.json',
            path: '../dist'
        },
        source: {
            name: 'package.json',
            path: './'
        }
    },
    'LICENSE': {
        build: {
            name: 'LICENSE',
            path: '../dist'
        },
        source: {
            name: 'LICENSE',
            path: './'
        }
    },
    'README.md': {
        build: {
            name: 'README.md',
            path: '../dist'
        },
        source: {
            name: 'README.md',
            path: './'
        }
    }
};

class Build {
    private readonly _files_paths: PathType;

    constructor(filesPaths?: PathType) {
        this._files_paths = filesPaths
            ? filesPaths
            : defaultFiles;
    };

    private readonly GeneratePaths = (filePath: string) => {
        const folders = filePath.split('/');

        let pastPath = '';

        for(const folder of folders) {
            try {
                pastPath += path.join(folder + '/');
                fs.opendirSync(pastPath);
            } catch {
                fs.mkdirSync(pastPath);
            };
        };
    };

    private readonly ReadFile = (filePath: string) => {
        const file = fs.readFileSync(path.join(filePath), 'utf-8');

        return file;
    };

    private readonly WriteFile = (filePath: MiniPathType) => {
        const build = path.join(filePath.build.path, filePath.build.name);
        const source = this.ReadFile(filePath.source.path + '/' + filePath.source.name);

        fs.writeFileSync(build, source, 'utf-8');
    
        console.log(`Сгенерировал ${filePath.build.name}`);
    };

    public readonly execute = () => {
        console.log('Начало генерации');

        for(const key in this._files_paths) {
            const value: MiniPathType = this._files_paths[key];

            this.GeneratePaths(value.build.path);
            
            console.log(`Генерирую ${value.source.name} в ${value.build.name}`);
            
            this.WriteFile(value);
        };

        console.log('Все файлы сгенерировались, выхожу');

        return exit();
    };
};

(() => { new Build().execute() })();

export default Build;