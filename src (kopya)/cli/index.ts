import { program } from 'commander';

/*program
  .option('-i --init', 'Initialize project')
  .option('-c --create <projectName> <template>', 'Create hierarchy project')
  .option('-a --add <fileName> <type>', 'Add file project')
  .option('-u --ui', 'Open ui app')
  .option('-g --git', 'Git initialize')
  .option('-s --serve', 'Localserver project');
*/
import File from '../core/lib/File';

let file = new File();
program
  .command('create <projectName>')
  .option('-t --template <template>', 'Template')
  .option('-g --git', 'Git Initialize')
  .action((projectName: any, opts: any) => {
    file.create(projectName, '', opts.template, opts.git);
  });

program
  .command('add <fileName> <fileType>')
  .option('-l --link', 'Template')
  .action((fileName: any, fileType: any, opts: any) => {
    file.add(fileName, fileType, opts.link);
  });

program
    .command('serve')
    .option('-l --link', 'Template')
    .action((opts: any) => {
        file.serve(opts.link);
    });

program.parse(process.argv);
