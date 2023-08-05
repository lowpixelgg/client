import rpc from "discord-rpc";
import { RichPrecense } from "./external/rpc";
import { createServer } from "http";
import { Server } from "socket.io";
import Updater from "./updater";
import { promisified } from "regedit";
import process from "child_process";
import path from 'path'

export interface StreamPlayer {
  id: string;
  coords: {
    x: number;
    y: number;
    z: number;
  };
}

export interface GamePlayer {
  location: string;
  coords: { x: number; y: number; z: number };
  streamInPlayers: StreamPlayer[];
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

    this.rpc = rpc;
    this.events();
    this.game = {
      location: "World",
      coords: { x: 0, y: 0, z: 0 },
      streamInPlayers: [],
    };

    this.win.openDevTools();

    this.updater.get.on("drain", () => {
      this.win.webContents.executeJavaScript("window.location.reload()");
    });

    this.defaultDirectory = this.updater.json.get('default_install_dir')
    this.customDirectory = this.updater.json.get('custom_install_dir')
  }

  public async getUserToken() {
    const localStorageValue = await this.win.webContents.executeJavaScript(
      'localStorage.getItem("saturn-api.token")'
    );
    return localStorageValue;
  }

  private events() {
    this.io.on("connection", (socket) => {
      socket.on("onFrontendConnect", (id) => {
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

      socket.on("onClientHeartBeat", async (data) => {
        data = JSON.parse(data)[0];
        this.io.to("frontend").emit("onClientHeartBeat", data);
      });

      socket.on("checkForUpdates", async (cb) => {
        if (await this.updater.hasGameContent()) {
          const needsUpdate = await this.updater.checkForUpdates();

          if (needsUpdate) {
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
            sha1: "sashagray",
            url: "https://storage.googleapis.com/rocketmta/gamesa.zip",
          })
          .on("finish", async () => {
            await promisified
              .createKey(["HKLM\\SOFTWARE\\Rocket Client"])
              .then(() => {
                promisified.putValue({
                  "HKLM\\SOFTWARE\\Rocket Client": {
                    "GTA:SA Path": {
                      value: path.join(path.resolve(installDir), 'game_sa', this.updater.json.get('ROCKET_KNOWN_GTA_FILE_NAME')),
                      type: "REG_SZ",
                    },
                  },
                });
              });
          });
      });

      socket.on("ClientNeedsDownloadUpdates", () => {});

      socket.on('ClientReadyToPlay', () => {
        const installDir = this.customDirectory ? this.customDirectory : this.defaultDirectory
        process.exec(path.join(path.resolve(installDir), 'server_sa', this.updater.json.get('ROCKET_KNOWN_MTA_FILE_NAME')))
      })
    });
  }
}


export default GameProps;
