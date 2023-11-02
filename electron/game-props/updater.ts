import editor, { JsonEditor } from "edit-json-file";
import fs from "fs";
import { Server } from "socket.io";
import request from "request";
import progress from "request-progress";
import Queue from "better-queue";
import zip from "zip-lib";
import fetch from "node-fetch";
import path from "path";

interface get {
  url: string;
  sha1: string;
  dir: string;
  rm: string[];
  release: string;
  version: string;
}

interface Download {
  time: { elapsed: number; remaining: number };
  speed: number;
  percent: number;
  size: { total: number; transferred: number };
}

type Update = {
  directory: string;
  download: string;
  id: string;
  product: string;
  release: string;
  rm: string[];
  sha1: string;
  version: string;
};

type Response = {
  statusCode: number;
  body: Update[];
};

export default class Updater {
  json: JsonEditor;
  io: Server;
  upcoming: Update[] = [];
  customDirectory: string | false;
  defaultDirectory: string;

  constructor(io: Server) {
    this.json = editor(path.join(path.resolve(), `update.json`));
    const updateJsonFile = fs.existsSync(
      path.join(path.resolve(), `update.json`)
    );

    if (!updateJsonFile) {
      this.json.empty();
      this.json.set(
        "master_entrypoint",
        "https://saturn-api.rocketmta.com/v1/game/updates/after/"
      );
      this.json.set("default_install_dir", "content");
      this.json.set("custom_install_dir", false);
      this.json.set("ROCKET_KNOWN_GTA_FILE_NAME", "gta_sa.exe");
      this.json.set("ROCKET_KNOWN_MTA_FILE_NAME", "RocketRP.exe");
      this.json.set("stable.version", "latest");
      this.json.set("stable.sha1", "");
      this.json.set("stable.release", new Date().toISOString());

      this.json.save();
    }

    if (!fs.existsSync(path.join(path.resolve(), `temp`))) {
      fs.mkdirSync(path.join(path.resolve(), `temp`));
    }

    this.io = io;

    this.defaultDirectory = this.json.get("default_install_dir");
    this.customDirectory = this.json.get("custom_install_dir");
  }

  public async checkInstallDir() {}

  public async hasGameContent() {
    const defaultInstalDir = this.json.get("default_install_dir");
    const customInstallDir = this.json.get("custom_install_dir");

    const instalLDir = customInstallDir
      ? path.join(
          customInstallDir,
          "game_sa",
          this.json.get("ROCKET_KNOWN_GTA_FILE_NAME")
        )
      : path.join(
          path.resolve(
            defaultInstalDir,
            "game_sa",
            this.json.get("ROCKET_KNOWN_GTA_FILE_NAME")
          )
        );

    if (fs.existsSync(instalLDir)) {
      return true;
    } else {
      return false;
    }
  }

  public async checkForUpdates(token: string) {
    let hasUpdate = false as boolean;

    const data = await fetch(
      this.json.get("master_entrypoint") + this.json.get("stable").release,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    await data.json().then((response: any) => {
      if (response.body && response.body.length > 0) {
        response.body.map((update) => [
          this.upcoming.push({ ...update.props }),
        ]);

        hasUpdate = true;
      } else {
        hasUpdate = false;
      }
    });

    return hasUpdate;
  }

  get = new Queue(({ url, dir, sha1, rm, release, version }: get, cb) => {
    progress(request(url))
      .on("progress", (state: Download) => {
        this.io.to("frontend").emit("onUpdaterProgress", {
          percent: (state.percent = state.percent * 100),
          string: `${formatBytes(state.size.transferred)}/${formatBytes(
            state.size.total
          )} ${formatBytes(state.speed)}/s`,
        });
      })
      .on("end", async () => {
        this.io.to("frontend").emit("onUpdaterProgress", {
          percent: 100,
          string: `Extraindo arquivos.`,
        });

        await zip
          .extract(path.join(path.resolve(), `temp/${sha1}.zip`), dir)
          .then(() => {
            fs.unlinkSync(path.join(path.resolve(), `temp/${sha1}.zip`));
          });

        this.json.set("stable.release", release);
        this.json.set("stable.version", version);
        this.json.save();

        return cb(null);
      })
      .pipe(
        fs.createWriteStream(path.join(path.resolve(), `temp/${sha1}.zip`))
      );
  });

  public async checkFilesIntegrity() {}
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return bytes + " bytes";
  } else if (bytes < 1024 ** 2) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 ** 3) {
    return (bytes / 1024 ** 2).toFixed(2) + " MB";
  } else {
    return (bytes / 1024 ** 3).toFixed(2) + " GB";
  }
}
