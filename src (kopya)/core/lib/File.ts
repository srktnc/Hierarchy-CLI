import fs from 'fs';
import https from 'https';
import replace from 'replace-in-file';
import { exec } from 'child_process';

export default class File {
  public fileTemplate = {
    html: ['index.html', '', '', '', ''],
    css: ['style.css', 'styles', '<!--CSS-->', '<link rel="stylesheet" href="', '">'],
    js: ['script.js', 'scripts', '<!--JS-->', '<script src="', '">'],
  };
  public data = [
    ['folder', 'src', '/'],
    ['file', 'index.html', '/src/'],
    ['file', 'index.html', '/src/'],
    ['folder', 'assets', '/src/'],
    ['folder', 'styles', '/src/assets/'],
    ['folder', 'scripts', '/src/assets/'],
    ['file', 'style.css', '/src/assets/styles/'],
    ['file', 'script.js', '/src/assets/scripts/'],
    ['folder', 'dist', '/'],
    ['file', '.hierarchy.js', '/'],
  ];

  constructor() {}

  public create(projectName: any = 'myProject', path: any, template: any, git: any) {
    function gitInit() {
      exec('cd' + ' ' + process.cwd() + '/' + projectName + '&& git init');
    }

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i][0] === 'file') {
        let data = '';
        https.get(
          'https://raw.githubusercontent.com/srktnc/Hierarchy-CLI/master/Templates/' +
            this.data[i][1],
          res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
              body += data;
            });
            res.on('end', () => {
              data = body;
              fs.writeFile(
                process.cwd() + '/' + projectName + this.data[i][2] + this.data[i][1],
                data,
                function(err) {
                  if (err) console.log(err);
                },
              );
            });
          },
        );
      } else if (this.data[i][0] === 'folder') {
        fs.mkdir(
          process.cwd() + '/' + projectName + this.data[i][2] + this.data[i][1],
          { recursive: true },
          err => {
            if (err) throw err;
          },
        );
      }
    }
    if (git) {
      gitInit();
    }
  }

  public add(file: any, type: any, link: any) {
    async function inject(fileName: any, value: any) {
      const hierarchyrc = require(process.cwd() + '/' + '.hierarchy.js');

      const options = {
        files: process.cwd() + '/' + 'src' + '/' + hierarchyrc.projectMain,
        from: value[2],
        to: value[2] + '\n\t' + value[3] + fileName + value[4],
      };

      try {
        const results = await replace(options);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
    for (let [key, value] of Object.entries(this.fileTemplate)) {
      if (type === key) {
        let data = '';
        https.get(
          'https://raw.githubusercontent.com/srktnc/Hierarchy-CLI/master/Templates/' + value[0],
          res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
              body += data;
            });

            res.on('end', () => {
              data = body;
              fs.writeFile(
                process.cwd() + '/' + 'src/assets/' + value[1] + '/' + file + '.' + type,
                data,
                function(err) {
                  if (err) {
                    console.log(err);
                    return;
                  } else {
                    if (link) {
                      inject(file + '.' + type, value);
                    }
                    return;
                  }
                },
              );
            });
          },
        );
      }
    }
  }

  public async serve(link:any) {
    const hierarchyrc = require(process.cwd() + '/' + '.hierarchy.js');

    const myShellScript = exec(' ls');
    // @ts-ignore
    myShellScript.stdout.on('data', (data: any) => {
      console.log(data);
    });
    // @ts-ignore
    myShellScript.stderr.on('data', (data: any) => {
      console.log('Please serve downloading');
      exec('npm i -g serve' + ' && ' + 'hierarchy serve');
    });
  }
}
