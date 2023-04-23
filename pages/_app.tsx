import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { ICountryData, ICurrency } from "@/interfaces/Country";
import Loading from "@/components/UI/Loading/Loading";

export default function App({ Component, pageProps }: AppProps) {
  const [currencies, setCurrencies] = useState<{ [key: string]: ICurrency }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fun = async function () {
      try {
        setIsLoading(true)
        const response = await fetch("https://restcountries.com/v3.1/all");
        // const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
        if (!response.ok) throw new Error("error OK");
        const data: ICountryData[] = await response.json();
        // console.log(data);
        const obj: { [key: string]: ICurrency } = {};
        data.forEach((i) => {
          if (!i?.currencies) {
            return;
          }
          let flag = i.flags.svg;
          if (Object.keys(i.currencies)[0] === "USD") {
            flag = "https://flagcdn.com/us.svg";
          }
          if (Object.keys(i.currencies)[0] === "EUR") {
            flag = "https://flagcdn.com/eu.svg";
          }
          if (!obj[Object.keys(i.currencies)[0]]) {
            obj[Object.keys(i.currencies)[0].toLowerCase()] = {
              ...i.currencies[Object.keys(i.currencies)[0]],
              flag: flag,
            };
          }
        });
        console.log(obj);
        console.log(Object.keys(obj).length);
        setCurrencies(obj);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)

      // fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`)
      //   .then((response) => response.json())
      //   .then(function (data) {
      //     console.log(data);
      //   });
    };
    fun();
  }, []);
  return (
    <>
      {isLoading ? <Loading /> : ""}
      <Component
        
        setIsLoading={setIsLoading}
        currencies={currencies}
        {...pageProps}
      />
    </>
  );
}
