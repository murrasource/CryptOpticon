export function CryptoAPI(list) {
  var frame = [];
  let self = this;
  return new Promise(function(resolve, reject) {
    let url = "https://api.coinbase.com/v2/exchange-rates";

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
        //console.log("Got JSON response from server:" + JSON.stringify(json));

        let data = json["data"]["rates"];
        let newdata = [];

        for(let key in data) {
          if(list.includes(key)){
            newdata.push(key);
          }
      }

      if(newdata.length > 0){
        newdata.forEach((crypto) => {
          let d = {
            "c_name": `${crypto}`,
            "price": "$" + (1 / data[crypto]).toFixed(2).toLocaleString(),
            "c_logo": `${crypto}.png`
          };
          frame.push(d);
        });
      }
      else{
        frame.push({
          "c_name": "NONE",
          "price": "Add in companion",
          "c_logo": ""
        });
      }

    resolve(frame);
    }).catch(function (error) {
      reject(error);
    });
  });
}