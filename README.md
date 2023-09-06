# treeextension README

* This "treeextension" extension allows to graphically display the functional characteristics discovered , in legacy systems, in the form of a lattice (Json).

* To use this project, you should be sure that Git is installed in your computer. Then write in the terminal:

> git clone https://github.com/fatmajallouli22/showJsonTreeExtensionVsCode.git

It's a public repository in my github space.

* The following website will teach you the fundamental concepts for building extensions:
     https://code.visualstudio.com/api/get-started/your-first-extension

## Requirements

* Make sure you have Node.js installed, then install Yeoman and VS Code Extension Generator with writing in terminal:

> npm install -g yo generator-code

* Install the D3 Library which provides advanced functionality for tree drawing:  

> npm install d3

* Inside the editor, press F5 or (>Run>Start Debugging) this will compile and run the extension in a new Extension Development Host window.

* in the new window , press (Ctrl+Shift+P) to run the command we want to test from the Command Palette. There is automatically a Hello World Command an I added a :

    - Hello Tree Command
    - Hello Json Command
    - Print Json Command
    - Show Tree Command

    To test the { Hello Tree, Hello Json, Print Json } Commands, you shoud comment the import of d3 in extension.js file. Besides, you should use the "require" instead of "import" to import others dependencies.  
    
    The Show Tree Command didn't run normally when I decomment the importation of d3. It causes errors. To solve this problem, I used a dynamic importation "import" instead of "require". The problem is not solved yet.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Working with Markdown

You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
