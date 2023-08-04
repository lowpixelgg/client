import editor, { JsonEditor } from "edit-json-file";
import fs from "fs";
import { Server,  } from "socket.io";
import request from "request";
import progress from "request-progress";
import Queue from "better-queue";
import zip from "zip-lib";
import fetch from 'node-fetch'
import GameProps from "./main";

interface  get {
  url: string;
  sha1: string;
  dir: string;
  rm: string[];
}

interface Download {
  time: { elapsed: number, remaining: number },
  speed: number,
  percent: number,
  size: { total: number, transferred: number }
}


type Update = {
  directory: string,
  download: string,
  id: string,
  product: string,
  release:string,
  rm: string[],
  sha1: string,
  version: string
}


type Response = {
  statusCode: number;
  body: Update[]
}

export default class Updater {
  json: JsonEditor
  io: Server
  upcoming: Update[] = []
  
  constructor (io: Server) {
    this.json = editor('./update.json');
    this.io = io;
  }
  
  public async checkInstallDir () {
  }
  
  
  
  public async hasGameContent () {
    if (fs.existsSync(this.json.get('content'))) {
      return true
    } else {
      return false
    }
  }



  public async checkForUpdates () {
    let hasUpdate = false as boolean;

    const data = await fetch(this.json.get('master_entrypoint') + this.json.get('stable').release)
    
    await data.json().then((response: Response) => {
      if (response.body.length > 0) {
        this.upcoming = response.body;
          

        hasUpdate = true;
      } else {
        hasUpdate = false;
      }
    })

    
    return hasUpdate
  }
  
  
  get = new Queue(({url, dir, sha1, rm}: get, cb) => {
    progress(request(url)).on('progress', (state: Download) => {
      this.io.to('frontend').emit('onUpdaterProgress', {
        percent: state.percent = state.percent * 100,
        string: `${formatBytes(state.size.transferred)}/${formatBytes(state.size.total)} ${formatBytes(state.speed)}/s`
      })
    })
    .on('end', async () => {
      this.io.to('frontend').emit('onUpdaterProgress', {
        percent: 100,
        string: `Extraindo arquivos.`
      })
      
      await zip.extract('./temp/'+{sha1}+'.zip', './' + dir).then(() => {
        fs.unlinkSync('./temp/'+{sha1}+'.zip');
        
        
        if (rm.length > 0) {
          for (let del of rm) {
            fs.unlinkSync('./' + del)
          }
        }
        
      });
      
      
      return cb(null)
    })
    .pipe(fs.createWriteStream('./temp/'+{sha1}+'.zip'));
  })
  

  
  public async checkFilesIntegrity () {
  }
} 


function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 ** 2) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 ** 3) {
    return (bytes / (1024 ** 2)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 ** 3)).toFixed(2) + ' GB';
  }
}