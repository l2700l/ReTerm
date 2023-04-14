# Apps

The simulator supports the execution of third-party applications, in order to add an application, it must be passed as the props parameter of applications.

## Create an application

An application is any object that implements the TermApp interface. It contains a required execute function that can return a ReactNode and optional information for the help command.

Examples:
<br />

_myOutputApp.application.ts_
```typescript
const myOutputApp: TermApp = {
  help: {
    template: 'myApp [text]',
    description: 'make soo cool'
  },
  execute: (command /*: string */, closeApp /*: closeApp*/) => {
    return closeApp(command);
  }
}
```
<br />

_myComponentApp.tsx_
```typescript jsx 
const myComponentApp: TermApp = {
  help: {
    template: 'myApp <params>',
    description: 'show something'
  },
  execute: (command /*: string */, closeApp /*: closeApp*/) => {
    return <MyComponent closeApp={closeApp}/> /* React.FC<{TermAppComponent}> */;
  }
}
```

**Reminder, always use closeApp to end the application**

## Adding an Application


As mentioned above - adding applications occurs through props applications, it is an object in which the key is in the role of a command, and its value is an instance of TermApp.

```typescript jsx
<Terminal
  applications={{ myOutputApp, 'anotherCommand': myComponentApp }}
/>
```

## Application call

The call is made when the first word of the user command matches the value from the available applications object. When called, the execute method is called, to which the following parameters are passed:

**command** - original command

**closeApp** - application close function

**value** - information about the internal data of the simulator and the user's device

The simulator stops rendering I/O and displays the running application until the closeApp method is called. If the application does not display the component on the screen, then a blank screen will be shown.

## Utils

for more convenient work with the command, there is a built-in method for trimming the first word (starting the application) - getArgs(command: string). It returns an object from an array of arguments and arguments as a string (user input without the first word).