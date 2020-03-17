"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
/*program
  .option('-i --init', 'Initialize project')
  .option('-c --create <projectName> <template>', 'Create hierarchy project')
  .option('-a --add <fileName> <type>', 'Add file project')
  .option('-u --ui', 'Open ui app')
  .option('-g --git', 'Git initialize')
  .option('-s --serve', 'Localserver project');
*/
const File_1 = __importDefault(require("../core/lib/File"));
let file = new File_1.default();
commander_1.program
    .command('create <projectName>')
    .option('-t --template <template>', 'Template')
    .option('-g --git', 'Git Initialize')
    .action((projectName, opts) => {
    file.create(projectName, '', opts.template, opts.git);
});
commander_1.program
    .command('add <fileName> <fileType>')
    .option('-l --link', 'Template')
    .action((fileName, fileType, opts) => {
    file.add(fileName, fileType, opts.link);
});
commander_1.program
    .command('serve')
    .option('-p --port <port>', 'Template')
    .action((opts) => {
    file.serve(opts.port);
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=index.js.map