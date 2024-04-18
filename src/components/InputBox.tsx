import { FC, useId } from "react";

interface InputBoxProps {
  label: string;
  amount: number;
  selectedCurrency: string;
  amountDisabled?: boolean;
  currencyOptions: string[];
  onAmountChange?: (amount: number) => void;
  onCurrencyChange: (currency: string) => void;
  placeholder: string;
}

const InputBox: FC<InputBoxProps> = ({
  label,
  amount,
  selectedCurrency = "usd",
  currencyOptions = [],
  amountDisabled = false,
  onAmountChange,
  onCurrencyChange,
  placeholder,
}) => {
  const id = useId();
  return (
    <div className="bg-white flex items-center py-2 px-3 rounded-md my-3">
      <div className="flex flex-1 flex-col items-start gap-2 text-lg">
        <label htmlFor={id} className="text-gray-500">
          {label}
        </label>
        <input
          id={id}
          type="number"
          placeholder={placeholder}
          className="w-full px-1 focus:outline-none"
          value={amount}
          onChange={(event) =>
            onAmountChange && onAmountChange(Number(event.target.value))
          }
          disabled={amountDisabled}
        />
      </div>

      <div className="flex flex-1 flex-col items-end gap-2 text-lg">
        <label htmlFor="currency" className="text-gray-500">
          Currency Type
        </label>
        <select
          name="currency"
          id="currency"
          value={selectedCurrency}
          onChange={(event) =>
            onCurrencyChange && onCurrencyChange(event.target.value)
          }
          className="focus:outline-none  p-1"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
