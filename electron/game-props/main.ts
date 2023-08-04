import rpc from "discord-rpc"
import { RichPrecense } from "./external/rpc";
import { createServer } from "http";
import { Server } from "socket.io";
import { app, BrowserWindow, shell, ipcMain, ipcRenderer } from "electron";
import Updater from "./updater";

export interface StreamPlayer {
  id: string,
  coords: {
    x: number,
    y: number,
    z: number,
  }
}

export interface GamePlayer {
  location: string,
  coords: { x: number, y: number, z: number }
  streamInPlayers: StreamPlayer[]
}

class GameProps {
  public io: Server;
  game: GamePlayer;
  rpc: RichPrecense;
  win: any;
  updater: Updater
  
  constructor (win, rpc: RichPrecense) {
    this.win = win;

    const httpServer = createServer();
    this.io = new Server(httpServer, {});
    this.updater = new Updater(this.io)
    
    this.rpc = rpc;
    this.events();
    this.game = {
      location: 'World',
      coords: { x: 0, y: 0, z: 0 },
      streamInPlayers: []
    }

    this.win.openDevTools()
  }
  
  public async getUserToken () {
    const localStorageValue = await this.win.webContents.executeJavaScript('localStorage.getItem("saturn-api.token")');
    return localStorageValue;
  }
  
  private events () {
    this.io.on("connection", (socket) => {
      socket.on('onFrontendConnect', (id) => {
        socket.join('frontend');
      })

      socket.on("rp_core:getUserToken", async () => {
        socket.emit('onLauncherSendToken', await this.getUserToken())
      });
      
      socket.on("onClientPlayerSpawn", async () => {
        this.win.webContents.send("onPlayerSpawn", true);
      });


      socket.on("onClientPlayerJoin", (id) => {
        this.win.webContents.send("onPlayerJoin", id);
      });


      socket.on("onClientPlayerLeave", (id) => {
        this.win.webContents.send("onPlayerDisconnect", id);
      })
      
      
      socket.on('onClientHeartBeat', async (data) => {
        data = JSON.parse(data)[0];
        this.io.to('frontend').emit('onClientHeartBeat', data)
      });


      socket.on('checkForUpdates', async (cb) => {
        if (true) {
          const needsUpdate = await this.updater.checkForUpdates()
          
          if (false) {
          } else {
            return cb('ClientReadyToPlay')
          }
        } else {
        }
      })

      socket.on('ClientNeedsDownloadContent', () => {
        this.updater.get.push({
          dir: './content/',
          rm: [],
          sha1: 'sashagray',
          url: 'https://storage.googleapis.com/rocketmta/gamesa.zip'
        })
      });


      socket.on('ClientNeedsDownloadUpdates', () => {

      })
    });
  }
}

export default GameProps;
