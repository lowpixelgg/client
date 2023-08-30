import rpc from "discord-rpc";
import { RichPrecense } from "./external/rpc";
import { createServer } from "http";
import { Server } from "socket.io";
import Updater from "./updater";
import regedit from "regedit";
// import { addValue } from 'qiao-regedit';

import utils from "windows-registry-napi";


import process from "child_process";
import path from 'path'
import electron from "electron";


export interface GamePlayer {
  location: string;
}

class GameProps {
  public io: Server;
  game: GamePlayer;
  rpc: RichPrecense;
  win: any;
  app: Electron.App;
  updater: Updater;
  customDirectory: string | false;
  defaultDirectory: string;

  constructor(win, rpc: RichPrecense, app: Electron.App) {
    this.win = win;
    this.app = app;


    const httpServer = createServer();
    this.io = new Server(httpServer, {});
    this.updater = new Updater(this.io);

    


    rpc.create().then(() => {
      this.rpc = rpc;
      console.log("rpc, created connection");

      rpc.request("Explorando o cliente")
    }).then((err: any) => {
    });

    this.events();
    
    this.game = {
      location: "World",
    };

    this.win.openDevTools();

    this.updater.get.on("drain", () => {
      this.win.webContents.executeJavaScript("window.location.reload()");
    });

    this.defaultDirectory = this.updater.json.get('default_install_dir')
    this.customDirectory = this.updater.json.get('custom_install_dir')


    const installDir = this.customDirectory ? this.customDirectory : this.defaultDirectory

    regedit.setExternalVBSLocation('resources/regedit/vbs');


    regedit.createKey(['HKLM\\SOFTWARE\\WOW6432Node\\Rocket Client'], () => {
      regedit.putValue({
        'HKLM\\SOFTWARE\\WOW6432Node\\Rocket Client': {
          "GTA:SA Path": {
            type: 'REG_SZ',
            value: path.join(path.resolve(installDir), 'game_sa')
          }
        }
      }, () => {console.log("ok")})
    })
  }

  public async getUserToken() {
    const localStorageValue = await this.win.webContents.executeJavaScript(
      'localStorage.getItem("saturn-api.token")'
    );
    return localStorageValue;
  }

  private events() {
    this.io.on("connection", (socket) => {
      socket.on("onFrontendConnect", () => {
        socket.join("frontend");
      });

      socket.on("rp_core:getUserToken", async () => {
        socket.emit("onLauncherSendToken", await this.getUserToken());
      });

      socket.on("onClientPlayerSpawn", async () => {
        this.win.webContents.send("onPlayerSpawn", true);
      });

      socket.on("onClientPlayerJoin", (id) => {
        this.win.webContents.send("onPlayerJoin", id);
      });

      socket.on("onClientPlayerLeave", (id) => {
        this.win.webContents.send("onPlayerDisconnect", id);
      });


      socket.on("checkForUpdates", async (cb) => {
        if (await this.updater.hasGameContent()) {
          const needsUpdate = await this.updater.checkForUpdates(await this.getUserToken());

          if (needsUpdate) {
            return cb("ClientNeedsDownloadUpdates");
          } else {
            return cb("ClientReadyToPlay");
          }
        } else {
          return cb("ClientNeedsDownloadContent");
        }
      });

      socket.on("ClientNeedsDownloadContent", () => {
        const installDir = this.customDirectory ? this.customDirectory : this.defaultDirectory
       
        this.updater.get
          .push({
            dir: path.join(installDir),
            rm: [],
            sha1: "rocketclient-content",
            url: "https://storage.googleapis.com/rocketmta/rocketmta.zip",
            release: new Date().toISOString(),
            version: "latest",
          })
      });

      socket.on("ClientNeedsDownloadUpdates", () => {
        this.updater.upcoming.map((update) => {
          this.updater.get.push({
            url: update.download, 
            dir: update.directory, 
            rm: update.rm,
            release: update.release,
            version: update.version,
          })
        });
      });

      socket.on('ClientReadyToPlay', () => {
        const installDir = this.customDirectory ? this.customDirectory : this.defaultDirectory
        process.exec(path.join(path.resolve(installDir), 'server_sa', this.updater.json.get('ROCKET_KNOWN_MTA_FILE_NAME')))
      })
    });
  }
}


export default GameProps;
