# kickoff-react-app

Create React apps without any configuration. 
Kickoff-React-App uses [Typescript v4](https://www.typescriptlang.org/docs/) And [React v17](https://reactjs.org/docs/getting-started.html) to develop the app. 

Also, Kickoff-React-App supports these features:
* Using [emotion](https://emotion.sh/docs/introduction) as css-in-js library
* Using [less](http://lesscss.org/usage/) as css pre-processor
* Using [jest](https://jestjs.io/docs/en/getting-started) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for unit test and component test
* Using [eslint](https://eslint.org/docs/user-guide/getting-started) and [prettier](https://prettier.io/docs/en/index.html) for code style
> **You'll need to have Node >=10 and Git >= 2.13 on your local development machine.**

If you have any questions or something doesn't work, please [file an issue](https://github.com/wjgogogo/kickoff-react-app/issues).

You can check [the template used by this tool](https://github.com/wjgogogo/kickoff-react-app/tree/template) for more detail information.   


## Creating an App
To create a new app, you may choose one of the following methods:

### npx
```bash
npx kickoff-react-app create react-app
```

### npm
```bash
npm i kickoff-react-app -g

kickoff-react-app create react-app
# shorthand format: kra create react-app
```
![](./quick-view.gif)


## Usage
Kickoff-React-App supports two commands: `create`, `init`.
```bash
▶ kra -h       
Usage: kickoff-react-app <command> [options]

Options:
  -v, --version          output the cli version
  -h, --help             display help for command

Commands:
  init <project-name>    quick generator a project without any css pre-processor, test and lint library support
  create <project-name>  create project interactively
  help [command]         display help for command
```
## create
Use `create` to create project interactively, and you can choose whether to use **css pre-process**, **test** and **lint** library.

```bash
kra create <project-name>
```

## init
Use `init` to quickly create basic project without any **css pre-process**, **test** and **lint** library.

```bash
kra init <project-name>
```



## License
[MIT](./LICENSE)





