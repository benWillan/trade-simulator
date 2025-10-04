import * as signalR from "@microsoft/signalr";

class StockSignalRService {

  private connection: signalR.HubConnection | null = null;

  async connect(): Promise<void> {

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7133/stockHub") // adjust port to your API
      .withAutomaticReconnect()
      .build();

    this.connection.on("ReceiveStockTick", (tick) => {

      console.log("Received Tick:", tick);
      
    });

    this.connection.on("Error", (msg) => {

      console.error("Error:", msg);

    });

    await this.connection.start();
    console.log("Connected to SignalR Hub");

  }

  async startSimulation(symbol: string, startTime: string): Promise<void> {

    if (!this.connection) return;

    await this.connection.invoke("StartSimulation", symbol, startTime, 1000);

  }

  async stopSimulation(): Promise<void> {

    if (!this.connection) return;

    await this.connection.invoke("StopSimulation");

  }
}

export const stockSignalRService = new StockSignalRService();