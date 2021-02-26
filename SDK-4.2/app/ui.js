import { CRYPTO_COUNT, CRYPTOS } from "../common/globals.js";
import document from "document";

export class CryptOpticonUI {
  constructor() {
      this.cryptoList = document.getElementById("cryptoList");
      this.statusText = document.getElementById("status");
  
      this.tiles = [];
      for (let i = 0; i < CRYPTO_COUNT; i++) {
        let tile = document.getElementById(`crypto-${i}`);
        if (tile) {
          this.tiles.push(tile);
        }
      }
  }

  updateUI(state, cryptos) {
    if (state === "loaded") {
      this.cryptoList.style.display = "inline";
      this.statusText.text = "";
      this.updateCryptoList(cryptos);
    }
    else {
      this.cryptoList.display = "none";
      if (state === "loading") {
        this.statusText.text = "Loading real-time trading prices ...";
      }
      else if (state === "disconnected") {
        this.statusText.text = "Please check connection to phone and Fitbit App";
      }
      else if (state === "error") {
        this.statusText.text = "Fatal Error. Please Exit and Retry";
      }
    }
  }
  
  updateCryptoList(cryptos) {
    for (let i = 0; i < CRYPTO_COUNT; i++) {
      let tile = this.tiles[i];
      if (!tile) {
        continue;
      }

      const crypt = cryptos[i];
      if (!crypt) {
        tile.style.display = "none";
        continue;
      }

      tile.style.display = "inline";

      tile.getElementById("c_name").text = crypt.c_name;
      tile.getElementById("price").text = crypt.price;
      tile.getElementById("c_logo").image = crypt.c_logo;
    }
  }
}