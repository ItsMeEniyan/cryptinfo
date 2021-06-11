import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import Confetti from "react-dom-confetti";

export default function App() {
  const [coins, getcoins] = useState([]);
  const [currencies, getcurrencies] = useState([]);
  const [apiresult, getapiresult] = useState("");
  const [selectedcoin, getselectedcoin] = useState("");
  const [selectedcurrency, getselectedcurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const [confettiflag, setconfettiflag] = useState(false);

  const config = {
    angle: "111",
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: "1750",
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

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
  const getallcurrencies = () => {
    axios
      .get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
      .then((response) => {
        //console.log(response.data[7000].id,response.data[7000].symbol,response.data[7000].name);
        const allcurrencies = response.data;
        getcurrencies(allcurrencies);
        //console.log(coins[7000].id,coins[7000].symbol,coins[7000].name);
        //console.log(coins);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  useEffect(() => {
    getallcoins();
    getallcurrencies();
  }, []);

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  return (
    <div className="App">
      <div className="title">Cryptinfo</div>
      <div className="formDiv">
      <Form
        onSubmit={(e) => {
          console.log(selectedcoin);
          setLoading(true);
          setconfettiflag(false);
          axios
            .get(
              `https://api.coingecko.com/api/v3/simple/price?ids=${selectedcoin}&vs_currencies=${selectedcurrency}`
            )
            .then((response) => {
              //getapiresult(response.data);
              //console.log(response.data)
              // const tempresult= response.data
              //console.log(response)
              
              setLoading(false);
              if (Object.size(response.data) === 0) {
                //console.log("haiii")
                getapiresult("Please enter valid Input");
              } else {
                setconfettiflag(true);
                const inttempresult =
                  response.data[`${selectedcoin}`][`${selectedcurrency}`];
                const strtempresult = inttempresult.toString();
                //getapiresult(response.data[`${selectedcoin}`].inr)
                getapiresult(strtempresult + ` ${selectedcurrency}`);
              }
              //console.log(apiresult)
              //console.log(strtempresult)
              //console.log(response.data[`${selectedcoin}`].inr)
            })
            .catch((error) => console.error(`Error: ${error}`));

          e.preventDefault();
        }}
      >
        <FormGroup>
          <Label>Coin</Label>
          <Input
            type="text"
            list="coins"
            value={selectedcoin}
            onChange={(e) => getselectedcoin(e.target.value)}
            required
          />
          <datalist id="coins">
            {
              <>
                {coins.map((coin) => {
                  return <option key={coin.id}>{coin.id}</option>;
                })}
              </>
            }
          </datalist>
        </FormGroup>
        <FormGroup>
          <Label>Currency</Label>
          <Input
            type="text"
            list="currencies"
            value={selectedcurrency}
            onChange={(e) => getselectedcurrency(e.target.value)}
            required
          />
          <datalist id="currencies">
            {
              <>
                {currencies.map((currency) => {
                  return <option key={currency}>{currency}</option>;
                })}
              </>
            }
          </datalist>
        </FormGroup>
        {loading && <LinearProgress color="primary" />}
        <Button color="primary" block>
          Submit</Button>
        
      </Form>
      </div>
      {<Confetti  active={confettiflag} config={config} />}
      <div>
      <div id="result">{apiresult}</div>
      </div>
      
    </div>
  );
}
