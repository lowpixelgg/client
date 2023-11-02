import rpc from "discord-rpc";
import { createServer } from "http";
import { Server } from "socket.io";
import Updater from "./updater";

import path from "path";
import { spawn } from "child_process";

export interface GamePlayer {
  location: string;
}

class GameProps {
  public io: Server;
  game: GamePlayer;
  win: any;
  app: Electron.App;
  updater: Updater;
  customDirectory: string | false;
  defaultDirectory: string;

  constructor(win, app: Electron.App) {
    this.win = win;
    this.app = app;

    const httpServer = createServer();
    this.io = new Server(httpServer, {});
    this.updater = new Updater(this.io);

    this.win.openDevTools();

    this.updater.get.on("drain", () => {
      this.win.webContents.executeJavaScript("window.location.reload()");
    });

    this.events();

    this.defaultDirectory = this.updater.json.get("default_install_dir");
    this.customDirectory = this.updater.json.get("custom_install_dir");
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

      socket.on("pixel_core:getUserToken", async () => {
        socket.emit("pixel_core:getUserToken", await this.getUserToken());
      });

      socket.on("checkForUpdates", async (cb) => {
        if (await this.updater.hasGameContent()) {
          const needsUpdate = await this.updater.checkForUpdates(
            await this.getUserToken()
          );

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
        const installDir = this.customDirectory
          ? this.customDirectory
          : this.defaultDirectory;

        this.updater.get.push({
          dir: path.join(installDir),
          rm: [],
          sha1: "content",
          url: "https://storage.googleapis.com/rocketmta/rocketmta.zip",
          release: new Date().toISOString(),
          version: "latest",
        });
      });

      socket.on("ClientNeedsDownloadUpdates", () => {
        this.updater.upcoming.map((update) => {
          this.updater.get.push({
            url: update.download,
            dir: update.directory,
            rm: update.rm,
            release: update.release,
            version: update.version,
          });
        });
      });

      socket.on("ClientReadyToPlay", () => {
        const installDir = this.customDirectory
          ? this.customDirectory
          : this.defaultDirectory;

        const fullDir = path.join(
          path.resolve(installDir),
          "server_sa",
          this.updater.json.get("ROCKET_KNOWN_MTA_FILE_NAME")
        );
        const open = spawn(fullDir);

        open.on("error", (err) => {
          throw err;
        });
      });
    });
  }
}

export default GameProps;
