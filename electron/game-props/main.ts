// class GameProps {
//   constructor () {

//   }
// }
import rpc from "discord-rpc"
import { RichPrecense } from "./external/rpc";
import { createServer } from "http";
import { Server } from "socket.io";

class GameProps {
  public io: Server;
  user: { fname: string; lname: string; serial: any; id: number; };
  rpc: RichPrecense;
  win: any;
  constructor (win, rpc: RichPrecense) {

    this.user = {
      fname: "Guest",
      lname: "Guest",
      serial: null,
      id: 0
    }

    this.win = win;

    const httpServer = createServer();
    this.io = new Server(httpServer, {});
    this.rpc = rpc;
    this.events();
  }

  public async getUserToken () {
    const localStorageValue = await this.win.webContents.executeJavaScript('localStorage.getItem("saturn-api.token")');
    return localStorageValue;
  }

  private events () {
    this.io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("rp_core:configure", (data) => {
        data = JSON.parse(data);
        const { serial, fname, lname, id } = data[0]
        console.log(data)

        if (serial || fname || lname || id) {
          this.user = {
            fname,
            lname,
            serial,
            id
          }
        }

        socket.emit("server:requestPlayerInformation")
      })

      socket.on("rp_core:setPlayerPosition", (data) => {
        const user = this.user
        data = JSON.parse(data);
        const { zone, slots, max } = data[0]

        this.rpc.request(`${user.fname} ${user.lname}(${user.id})`, `Em: ${zone} (${slots}/${max})`)
      })

      socket.on("rp_core:onCoreRequestToken", async () => {
        socket.emit("rp_core:onServerSendInformation", await this.getUserToken());
      })
    });
  }
}

export default GameProps;
