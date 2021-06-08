import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [coins, getcoins] = useState([]);
  const [apiresult, getapiresult] = useState("");
  const [selectedcoin, getselectedcoin] = useState("");
  const [selectedcurrency, getselectedcurrency] = useState("");

  const getallcoins = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/list")
      .then((response) => {
        //console.log(response.data[7000].id,response.data[7000].symbol,response.data[7000].name);
        const allcoins = response.data;
        getcoins(allcoins);
        //console.log(coins[7000].id,coins[7000].symbol,coins[7000].name);
        //console.log(coins);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  useEffect(() => {
    getallcoins();
  }, []);

  return (
    <div className="App">
      <div>Cryptinfo</div>
      <form
        onSubmit={(e) => {
          console.log(selectedcoin);
          axios
            .get(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedcoin}&vs_currencies=inr`)
            .then((response) => {
              //getapiresult(response.data);
              //console.log(response.data)
             // const tempresult= response.data
             const inttempresult =response.data[`${selectedcoin}`].inr;
             const strtempresult =inttempresult.toString();
              //getapiresult(response.data[`${selectedcoin}`].inr)
              getapiresult(strtempresult);
              //console.log(apiresult)
              //console.log(strtempresult)
              //console.log(response.data[`${selectedcoin}`].inr)
            })
            .catch((error) => console.error(`Error: ${error}`));

          e.preventDefault();
        }}
      >
        <input
          type="text"
          list="coins"
          value={selectedcoin}
          onChange={(e) => getselectedcoin(e.target.value)}
        />
        <datalist id="coins">
          {
            <>
              {coins.map((coin) => {
                return <option key={coin.id} >{coin.id}</option>;
              })}
            </>
          }
        </datalist>
        <button> Submit </button>
      </form>
      <div id="result">{apiresult}</div>
      {/* {<>
        {coins.map((coin) => {
          return <div key={coin.id}>{coin.name}</div>;
        })}
      </>}  */}
    </div>
  );
}
