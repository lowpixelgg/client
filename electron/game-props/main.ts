import rpc from "discord-rpc"
import { RichPrecense } from "./external/rpc";
import { createServer } from "http";
import { Server } from "socket.io";
import { app, BrowserWindow, shell, ipcMain } from "electron";

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
  
  
  constructor (win, rpc: RichPrecense) {
    this.win = win;
    
    const httpServer = createServer();
    this.io = new Server(httpServer, {});
    this.rpc = rpc;
    this.events();
    this.game = {
      location: 'World',
      coords: { x: 0, y: 0, z: 0 },
      streamInPlayers: []
    }
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
      
      socket.on("rp_voip:onPlayerSpawn", async () => {
        this.win.webContents.send("onPlayerSpawn", true);
      });
      
      
      socket.on('rp_voip:onVoipHeartbeat', async (data) => {
        data = JSON.parse(data)[0];
        
        this.game = {
          location: data.location,
          coords: {
            x: data.coords.x,
            y: data.coords.y,
            z: data.coords.z,
          },
          streamInPlayers: data.streamInPlayers
        }
        
        this.io.to('frontend').emit('onServerHeartBeat', this.game)
      });
      
      
      socket.on('rp_voip:onVoipAddPlayer', async (peer) => {
        this.win.webContents.send("onServerCallPeer", peer);
      });
      
      socket.on("rp_voip:onVoipRemovePlayer", async (peer) => {
        this.win.webContents.send("onServerDisconectPeer", peer);
      })
    });
  }
}

export default GameProps;
