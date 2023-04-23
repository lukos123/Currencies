import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
// import Block, { variantColor } from "@/components/Block/Block";
// import Input from "@/components/UI/Input/Input";
// import useInput from "@/hooks/useInput";
// import Slider from "@/components/Slider/Slider";
// import Modal from "@/components/Modal/Modal";
const inter = Inter({ subsets: ["latin"] });
import { Dispatch, SetStateAction, useState } from "react";
// import ContentLoader from "react-content-loader"
// import gravatar from 'gravatar';
import { useEffect, useRef } from "react";
import Currency from "@/components/Currency/Currency";
import { ICurrency } from "@/interfaces/Country";
import Loading from "@/components/UI/Loading/Loading";
interface props {
  currencies: { [key: string]: ICurrency };
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
export default function Home({ currencies, setIsLoading }: props) {
  const [currenciesArray, setCurrenciesArray] = useState<string[]>([]);
  const [coefficient, setCoefficient] = useState<number>(1);
  const [currentCurrencies1, setCurrentCurrencies1] = useState<string>("uah");
  const [currentCurrencies2, setCurrentCurrencies2] = useState<string>("usd");
  const [inputNumber1, setInputNumber1] = useState<number | undefined>(1);
  const [inputNumber2, setInputNumber2] = useState<number | undefined>(1);
  const [focusElement, setFocusElement] = useState<number>(2);
  useEffect(() => {
    const temp1 = JSON.parse(
      localStorage.getItem("currentCurrencies1") 
    ) ?? "uah";
    setCurrentCurrencies1(temp1);
    const temp2 = JSON.parse(
      localStorage.getItem("currentCurrencies2") 
    ) ?? "usd";
    setCurrentCurrencies2(temp2);
  }, []);
  const inputHandler1 = (e: { target: { value: string } }) => {
    setInputNumber1(e.target.value === "" ? undefined : Number(e.target.value));
    setInputNumber2(
      e.target.value === ""
        ? undefined
        : Number((parseFloat(e.target.value) * coefficient).toFixed(2))
    );
  };
  const inputHandler2 = (e: { target: { value: string } }) => {
    setInputNumber2(e.target.value === "" ? undefined : Number(e.target.value));
    setInputNumber1(
      e.target.value === ""
        ? undefined
        : Number((parseFloat(e.target.value) / coefficient).toFixed(2))
    );
  };
  const CurrentCurrenciesHandler1 = (currency: string) => {
    setCurrentCurrencies1(currency);
    setFocusElement(1);
  };
  const CurrentCurrenciesHandler2 = (currency: string) => {
    setCurrentCurrencies2(currency);
    setFocusElement(2);
  };
  useEffect(() => {
    const tempArray: string[] = [];
    for (const key of Object.keys(currencies)) {
      tempArray.push(key);
    }
    // console.log(tempArray);

    setCurrenciesArray(tempArray.sort());
  }, [currencies]);
  useEffect(() => {
    const fn = async function () {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currentCurrencies1}/${currentCurrencies2}.json`
        );
        // const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
        if (!response.ok) throw new Error("error OK");
        const data: { [key: string]: number } = await response.json();
        if (focusElement === 1) {
          setInputNumber2(
            `${inputNumber2 ?? ""}` === "" ? undefined : inputNumber2
          );
          setInputNumber1(
            `${inputNumber2 ?? ""}` === ""
              ? undefined
              : Number(
                  ((inputNumber2 ?? 0) / data[currentCurrencies2]).toFixed(2)
                )
          );
        } else if (focusElement === 2) {
          setInputNumber1(
            `${inputNumber1 ?? ""}` === "" ? undefined : inputNumber1
          );
          setInputNumber2(
            `${inputNumber1 ?? ""}` === ""
              ? undefined
              : Number(
                  ((inputNumber1 ?? 0) * data[currentCurrencies2]).toFixed(2)
                )
          );
        }
        setCoefficient(data[currentCurrencies2]);
        localStorage.setItem(
          "currentCurrencies1",
          JSON.stringify(currentCurrencies1)
        );
        localStorage.setItem(
          "currentCurrencies2",
          JSON.stringify(currentCurrencies2)
        );
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    fn();
  }, [currentCurrencies1, currentCurrencies2, focusElement]);

  return (
    <>
      <Head>
        <title>Currencies</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Currency
          inputNumber={inputNumber1}
          setInputNumber={inputHandler1}
          currencies={currencies}
          currenciesArray={currenciesArray}
          currentCurrencies={currentCurrencies1}
          setCurrentCurrencies={CurrentCurrenciesHandler1}
        />
        <Currency
          setInputNumber={inputHandler2}
          inputNumber={inputNumber2}
          currencies={currencies}
          currenciesArray={currenciesArray}
          currentCurrencies={currentCurrencies2}
          setCurrentCurrencies={CurrentCurrenciesHandler2}
        />
      </main>
    </>
  );
}
