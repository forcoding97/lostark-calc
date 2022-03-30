import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Auction.module.css';
import { useState, useEffect } from 'react';

const Auction: NextPage = () => {
  const [value, setValue] = useState(0);
  const [recommend, setRecommend] = useState(0);

  useEffect(() => {
    setRecommend(Math.round((value * 0.95 - (value * 0.95) / 8) / 1.1));
  }, [value]);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(event.target.value);
    if (numberValue !== NaN) {
      setValue(numberValue);
      console.log(numberValue);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>LostArk Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.button_container}>
        <button onClick={() => setValue(value + 5000)}>+ 5000</button>
        <button onClick={() => setValue(value + 1000)}>+ 1000</button>
        <button onClick={() => setValue(value + 500)}>+ 500</button>
        <button onClick={() => setValue(value + 100)}>+ 100</button>
        <button onClick={() => setValue(value + 50)}>+ 50</button>
        <button onClick={() => setValue(value + 10)}>+ 10</button>
        <button onClick={() => setValue(0)}>Clear</button>
      </div>

      <div>
        <input
          type="number"
          value={value}
          onChange={(event) => changeValue(event)}
        />
      </div>

      {/* <div>{bifurcation}</div> */}
      <div>{recommend}</div>
    </div>
  );
};

export default Auction;
