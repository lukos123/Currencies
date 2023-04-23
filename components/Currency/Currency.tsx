"use client";
import { Dispatch, FC, SetStateAction } from "react";
import classes from "./Currency.module.scss";
import { useState } from "react";
import { ICurrency } from "@/interfaces/Country";
// export enum variantColor{
//   red="red",
//   green="green",
//   blue="blue"
// }
interface Props {
  setCurrentCurrencies: (currency: string) => void;
  currenciesArray: string[];
  currencies: { [key: string]: ICurrency };
  currentCurrencies: string;
  inputNumber: number | undefined;
  setInputNumber: (e: {
    target: {
      value: string;
    };
  }) => void;
}
const Currency: FC<Props> = ({
  setCurrentCurrencies,
  currenciesArray,
  currencies,
  currentCurrencies,
  inputNumber,
  setInputNumber,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${currencies[currentCurrencies]?.flag})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={classes.Currency}
    >
      <select
        className={classes.select}
        value={currentCurrencies}
        onChange={(e) => {
          setCurrentCurrencies(e.target.value);
        }}
        name=""
        id=""
      >
        {currenciesArray?.map((currency, id) => {
          return (
            <option value={currency} key={id}>
              {currency.toUpperCase()}:{currencies[currency].symbol}
              {"  "}
              {currencies[currency].name}
            </option>
          );
        })}
      </select>
      <form className={classes.form}>
        <input
          className={classes.input}
          value={inputNumber ?? ""}
          onChange={setInputNumber}
          type="number"
        />
      </form>
    </div>
  );
};

export default Currency;
