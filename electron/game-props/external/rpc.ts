import rpc from "discord-rpc"

type IRequest = rpc.Presence



export class RichPrecense {
  client: rpc.Client
  now: number;

  constructor () {
    this.now = Date.now();


    this.client = new rpc.Client({ transport: "ipc" })
  }

  public async create () {
    return this.client.login({clientId: "1059505942787539005"})
  }

  private getButtonsConfig (): Array<{ label: string; url: string }> | undefined {
    const buttons = [
      {
        label: "Plataforma",
        url: "https://play.rocketmta.com"
      },
      {
        label: "Discord",
        url: "https://discord.gg/rocketrp"
      }
    ]

    return buttons
  }

  public async request (details: string, state?: string) {
    this.client.setActivity({
      largeImageKey: "rocketlogon",
      largeImageText: "Rocket é High.",
      details: details,
      state: state ? state : undefined,
      instance: false,
      startTimestamp: this.now,
      buttons: this.getButtonsConfig()
    })
  }
}
