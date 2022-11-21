const { unlinkSync, renameSync } = require('fs');
const path = require('path');

const assetPath = path.resolve(__dirname, 'assets');

const deleteFiles = ['app.jsx.asset.php'];

const moveFiles = [
    {from: 'app.jsx.js', to: 'app.js'},
    {from: 'app.jsx.css', to: 'app.css'}
];

deleteFiles.forEach(fileToDelete => unlinkSync(`${assetPath}/${fileToDelete}`));
moveFiles.forEach(fileMove => renameSync(`${assetPath}/${fileMove.from}`, `${assetPath}/${fileMove.to}`));