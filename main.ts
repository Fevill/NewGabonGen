import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { createConnection } from 'typeorm';
import {Clan, Personne,DureeDeVie,Nom,Profession} from './src/app/entity';
import { addClan, getClans, deleteClan, updateClan } from './mainClanDbService';
import { addPersonne, getPersonnes, deletePersonne, updatePersonne,getPersonneDetail } from './mainPersonneDbService';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow = null;

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

const createWindow = async () => {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  let  clanRepo;
  let personneRepo;
  
  /**Connexion à la BD */
  const connection = createConnection({
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: './src/assets/data/database.sqlite',
    entities: [ Clan, Personne,DureeDeVie,Nom,Profession ]
  });

  /**Clan */
  connection.then(async connection => {
    const clanRepo = await connection.getRepository(Clan);
    await getClans(clanRepo);
    await addClan(clanRepo);
    await deleteClan(clanRepo);
    await updateClan(clanRepo);
  }).catch(error => console.log(error));

  /**Personne */
  connection.then(async connection => {
    const personneRepo = await connection.getRepository(Personne)
    await getPersonnes(personneRepo);
    await addPersonne(personneRepo);
    await deletePersonne(personneRepo);
    await updatePersonne(personneRepo);

  }).catch(error => console.log(error));

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule : true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  // and load the index.html of the app.
  //win.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (serve) {

    //win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    //win.webContents.openDevTools();

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.