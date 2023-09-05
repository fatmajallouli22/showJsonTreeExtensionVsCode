// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
//import  vscode from 'vscode';
const  vscode = require('vscode');
//const jsonTreeView = require('json-tree-view');
const fs = require('fs');
const d3 = require('d3');
//const path = require('path');
//import  d3 from  "d3";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


/*helloJson permet d’ouvrir un fichier json de mon choix à partir de mon ordinateur*/
function helloJson () {

	vscode.window.showOpenDialog({ filters: { 'JSON files': ['json'] } })
    .then(uri => {
      if (uri && uri[0]) {
        const jsonFilePath = uri[0].fsPath;
        //ouvrir le fichier JSON dans un éditeur
        vscode.workspace.openTextDocument(jsonFilePath)
          .then(doc => {
            vscode.window.showTextDocument(doc);
          })
          // @ts-ignore
          .catch(error => {
            vscode.window.showErrorMessage(`Erreur lors de l'ouverture du fichier JSON : ${error.message}`);
          });
      }
    });
	

}
/*printJson permet de  Lire le contenu du fichier JSON et l'afficher sur console*/
function printJson () {
 // Lire le contenu du fichier JSON
	 
	 const jsonFilePath = 'C:/Users/fatma/stage_extension/vsCodeTreeExtension/treeextension/Lucene-3.0.0_lattice.json';
	 fs.readFile(jsonFilePath, 'utf8', (err, data) => {
		if (err) {
		  console.error(`Erreur lors de la lecture du fichier JSON : ${err}`);
		  return;
		}
	
		try {
		  // Analyser le contenu JSON en un objet JavaScript
		  const jsonData = JSON.parse(data);
	
		  // Afficher la structure JSON dans la console
		  console.dir(jsonData, { depth: null });
		} catch (parseError) {
		  console.error(`Erreur lors de l'analyse du JSON : ${parseError}`);
		}
	  });
    vscode.window.showInformationMessage('print json  from TreeExtension!');


}	
function showTree(){
  const jsonFilePath = 'C:/Users/fatma/stage_extension/vsCodeTreeExtension/treeextension/Lucene-3.0.0_lattice.json';
	  vscode.workspace.openTextDocument(vscode.Uri.file(jsonFilePath)).then(document => {
		const fileContent = document.getText();
		try {
            const jsonData = JSON.parse(fileContent); //les données structurées du fichier JSON dans la variable jsonData
          

            // Créez une fonction récursive pour convertir vos données JSON en une structure d'arborescence compatible avec D3.js
            function buildTree(data) {
                const treeData = {
                    name: "root", //  nom de  la racine de l'arborescence
                    children: []
                };

                data.forEach(node => {
                    const newNode = {
                        name: node.name,
                        children: buildTree(node.children)
                    };
                    treeData.children.push(newNode);
                });

                return treeData;
            }

            // Conversion des  données JSON en une structure d'arborescence compatible avec D3.js
            const treeData = buildTree(jsonData);

            // Construction de  l'arborescence avec D3.js
            const width = 800;
            const height = 600;

            const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

            const treeLayout = d3.tree().size([height, width - 100]);
            const root = d3.hierarchy(treeData);
            const treeDataProcessed = treeLayout(root);

            const links = treeDataProcessed.links();
            const nodes = treeDataProcessed.descendants();

            svg.selectAll('.link')
                .data(links)
                .enter()
                .append('path')
                .attr('class', 'link')
                .attr('d', d => `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`);

            const node = svg.selectAll('.node')
                .data(nodes)
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('transform', d => `translate(${d.y},${d.x})`);

            node.append('circle').attr('r', 5);

            node.append('text')
                .attr('dy', '0.31em')
                .attr('x', d => d.children ? -6 : 6)
                .style('text-anchor', d => d.children ? 'end' : 'start')
                .text(d => d.data.name);

        } catch (error) {
            console.error('Erreur lors de l\'analyse du JSON:', error);
        }
    }, error => {
        console.error('Impossible d\'ouvrir le fichier:', error);
    });
	
  vscode.window.showInformationMessage('show tree  from TreeExtension!');
}
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "treeextension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('treeextension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from TreeExtension!');
	});

	context.subscriptions.push(disposable);
	/************************************************ */
	let disposable1 = vscode.commands.registerCommand('treeextension.helloTree', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello Tree from TreeExtension!');
	});

	context.subscriptions.push(disposable1);
	/***************************************************** */
	
	let disposable2 = vscode.commands.registerCommand('treeextension.helloJson', helloJson);

	context.subscriptions.push(disposable2);
  /***************************************************** */
	
	let disposable3 = vscode.commands.registerCommand('treeextension.printJson', printJson);

	context.subscriptions.push(disposable3);
   /***************************************************** */
	
	let disposable4 = vscode.commands.registerCommand('treeextension.showTree', showTree);

	context.subscriptions.push(disposable4);

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
