import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyData from "./hooks/useCurrencyData";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("kes");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyData(from);
  const options = Object.keys(currencyInfo);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);

    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convertCurrency = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="bg-gray-800/40 w-full md:max-w-xl lg:max-w-2xl mx-2 lg:mx-0 border-gray-800 border-2 shadow-lg rounded-lg">
        <h1 className="text-white text-2xl md:text-4xl font-semibold py-2 text-center">
          Currency Converter
        </h1>

        <form
          className="px-3 mb-4"
          onSubmit={(event) => {
            event.preventDefault();
            convertCurrency();
          }}
        >
          <div className="mb-1">
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={(amount) => setAmount(amount)}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectedCurrency={from}
              currencyOptions={options}
              placeholder="Amount"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={handleSwap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-3/4 bg-blue-500 text-white px-2 py-1 rounded-md font-medium"
            >
              Swap
            </button>
          </div>

          <div className="mb-1">
            <InputBox
              label="To"
              amount={Number(convertedAmount.toFixed(2))}
              onCurrencyChange={(currency) => setTo(currency)}
              selectedCurrency={to}
              currencyOptions={options}
              placeholder="Converted Amount"
              amountDisabled
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-lg font-semibold px-4 py-2 rounded-md"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
