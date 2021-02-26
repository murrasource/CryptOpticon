import * as messaging from "messaging";
import { settingsStorage } from "settings";

import { CryptoAPI } from "./crypto.js"
import { CRYPTO_COUNT, CRYPTO_WATCHLIST } from "../common/globals.js";

settingsStorage.onchange = function(evt) {
  sendCryptoList();
}

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  sendCryptoList();
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

function sendCryptoList() {
  let list = settingsStorage.getItem(CRYPTO_WATCHLIST);
  let c_list = []
  if (list) {
    try {
      list = JSON.parse(list);
      for(let i = 0; i < list.length; i++){
        c_list.push(list[i].abbreviation);
      }
    }
    catch (e) {
      console.log("error parsing setting value: " + e);
    }
  }
  else{
    c_list.push("NONE");
  };
 
  
  CryptoAPI(c_list).then(function(cryptos) {
      if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Limit results to the number of tiles available in firmware
        cryptos.splice(CRYPTO_COUNT, cryptos.length);
        messaging.peerSocket.send(cryptos);
      }
    });
}
