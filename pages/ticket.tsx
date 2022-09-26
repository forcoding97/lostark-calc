import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Auction.module.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

const Ticket: NextPage = () => {
  //인원수(Headcount)
  const [hc, setHc] = useState(8);

  //경매장 판매가
  const [price, setPrice] = useState(0);

  //손익분기점(Break-Even Point), 초과 입찰시 손해
  const [bep, setBep] = useState(0);
  //손익분기점 직전의 입찰직전가
  const [profit, setProfit] = useState(0);
  //추천가(Recommend, 이익이 많이 남는 입찰가보다 소폭 높은 가격으로, 추가 입찰시 손해)
  const [rec, setRec] = useState(0);

  //손익분기점 값
  const [bepValue, setBepValue] = useState('0');
  //입찰직전가 값
  const [profitValue, setProfitValue] = useState('0');
  //추천가 값
  const [recValue, setRecValue] = useState('0');

  useEffect(() => {
    //인원수가 1명 이하일 경우, 모든 value 를 0으로 초기화
    if (hc <= 1) {
      setBep(0);
      setProfit(0);
      setRec(0);
    } else {
      //판매 수수료를 제외한 순수익(Net Income)
      const netIncome = price * 0.95;
      const breakEvenPoint = netIncome - netIncome / hc;
      setBep(Math.round(breakEvenPoint));
      setProfit(Math.round(breakEvenPoint / 1.1));
      if (price < 300) {
        setRec(Math.round(breakEvenPoint / 1.1) + 2);
      } else {
        setRec(Math.ceil(breakEvenPoint / 1.1 / 10) * 10);
      }
    }
  }, [price, hc]);

  useEffect(() => {
    if (price === 0) {
      setBepValue('0');
      setProfitValue('0');
      setRecValue('0');
    } else {
      if (bep < 50) {
        setBepValue('입찰하는 것이 손해입니다.');
      } else {
        setBepValue(String(bep));
      }
      if (profit < 50) {
        setProfitValue('직전입찰가 입력이 불가능합니다.');
      } else {
        setProfitValue(String(profit));
      }
      if (rec < 50) {
        setRecValue('입찰선점가 입력이 불가능합니다.');
      } else {
        setRecValue(String(rec));
      }
    }
  }, [price, bep, profit, rec]);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(event.target.value);
    if (numberValue !== NaN) {
      setPrice(numberValue);
    }
  };

  const clearValue = () => {
    setPrice(0);
    setProfit(0);
    setRec(0);
  };

  const notify = () =>
    toast.info('클립보드에 복사 되었습니다.', {
      position: 'bottom-center',
      theme: 'dark',
      autoClose: 2200,
      transition: Zoom,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: '',
    });

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Head>
          <title>LostArk Calculator</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/calculator.ico" />
        </Head>

        <div className={styles.hc_button_container}>
          <button
            className={hc === 4 ? styles.hc_selected_button : styles.hc_button}
            onClick={() => setHc(4)}
          >
            4人
          </button>
          <button
            className={hc === 8 ? styles.hc_selected_button : styles.hc_button}
            onClick={() => setHc(8)}
          >
            8人
          </button>
          <button
            className={hc === 16 ? styles.hc_selected_button : styles.hc_button}
            onClick={() => setHc(16)}
          >
            16人
          </button>
          <input
            type="number"
            max="30"
            placeholder="인원수 직접입력"
            className={styles.hc_input}
            onChange={(event) => {
              if (event.target.value) {
                setHc(Number(event.target.value));
              }
            }}
          />
        </div>

        <div className={styles.value_button_container}>
          <button
            className={styles.value_button}
            onClick={() => setPrice(price + 5000)}
          >
            + 5000
          </button>
          <button
            className={styles.value_button}
            onClick={() => setPrice(price + 1000)}
          >
            + 1000
          </button>
          <button
            className={styles.value_button}
            onClick={() => setPrice(price + 500)}
          >
            + 500
          </button>
          <button
            className={styles.value_button}
            onClick={() => setPrice(price + 100)}
          >
            + 100
          </button>
          <button
            className={styles.value_button}
            onClick={() => setPrice(price + 50)}
          >
            + 50
          </button>
          <button
            className={styles.value_button}
            onClick={() => setPrice(price + 10)}
          >
            + 10
          </button>
        </div>

        <div className={styles.value_container}>
          <div className={styles.value_name}>경매장가격</div>
          <input
            type="number"
            placeholder="경매장 판매가를 입력해주세요."
            //숫자 앞에 붙은 0 을 삭제합니다. 예를 들어, 023 인 경우 23 을 출력합니다.
            value={
              String(price) !== '0' ? String(price).replace(/(^0+)/, '') : price
            }
            className={styles.value_input}
            onChange={(event) => changeValue(event)}
          />
          <button className={styles.clear} onClick={() => clearValue()}>
            CLEAR
          </button>
        </div>

        <div className={styles.bep_container}>
          <div className={styles.bep_name}>손익분기점</div>
          <div className={styles.bep_circle_question_mark}>
            <FontAwesomeIcon icon={faCircleQuestion} />
            <div className={styles.bep_balloon}>
              <span className={styles.bep_explanation}>
                경매로 얻는 이익과 공대 및 파티원들이 받는 분배금이 동일해지는
                구간입니다.
              </span>
              <span className={styles.bep_explanation}>
                이 이상 입찰할 경우, 입찰자가 분배금보다 적은 이익을 얻게
                됩니다.
              </span>
            </div>
          </div>
          <div
            className={styles.bep_value}
            onClick={() =>
              navigator.clipboard.writeText(String(bepValue)).then(notify)
            }
          >
            <span>{bepValue}</span>
          </div>
        </div>
        <div className={styles.profit_container}>
          <div className={styles.profit_name}>직전입찰가</div>
          <div className={styles.profit_circle_question_mark}>
            <FontAwesomeIcon icon={faCircleQuestion} />
            <div className={styles.profit_balloon}>
              <span className={styles.profit_explanation}>
                손익분기점에 대한 직전입찰가입니다.
              </span>
              <span className={styles.profit_explanation}>
                이 구간에서 재입찰을 할 경우, 재입찰금은 손익분기점과
                동일해집니다.
              </span>
            </div>
          </div>
          <div
            className={styles.profit_value}
            onClick={() =>
              navigator.clipboard.writeText(String(profitValue)).then(notify)
            }
          >
            {profitValue}
          </div>
        </div>
        <div className={styles.rec_container}>
          <div className={styles.rec_name}>입찰선점가</div>
          <div className={styles.rec_circle_question_mark}>
            <FontAwesomeIcon icon={faCircleQuestion} />
            <div className={styles.rec_balloon}>
              <span className={styles.rec_explanation}>
                직전입찰가를 기반으로 추천되는 입찰선점가입니다.
              </span>
              <span className={styles.rec_explanation}>
                이 금액에서 재입찰이 이뤄질 경우, 재입찰자가 얻는 이익이
                분배금보다 적어집니다.
              </span>
            </div>
          </div>
          <div
            className={styles.rec_value}
            onClick={() =>
              navigator.clipboard.writeText(String(recValue)).then(notify)
            }
          >
            {recValue}
          </div>
        </div>
      </div>
      <div className={styles.description_box}>
        <span className={styles.description_title}>
          {'<'}사용설명서{'>'}
        </span>
        <span className={styles.description_item}>
          • 경매장가격을 입력하면 손익분기점, 직전입찰가, 입찰선점가를 자동으로
          계산합니다.
        </span>
        <span className={styles.description_item}>
          • 인원수는 기본적으로 8명을 기준으로 하며, <br />
          <span className={styles.description_space}>{'• '}</span>
          인원을 선택하거나 직접 입력하는 방식을 통해 재설정할 수 있습니다.
        </span>
        <span className={styles.description_item}>
          • 경매장가격은 0 을 기준으로 우측에 입력할 시 1의 자리부터, <br />
          <span className={styles.description_space}>{'• '}</span>
          좌측에 입력할 시 10의 자리부터 입력할 수 있습니다.
        </span>
        <span className={styles.description_item}>
          • 손익분기점, 직전입찰가, 입찰선점가에 대한 설명은 옆의{' '}
          <FontAwesomeIcon icon={faCircleQuestion} /> 마크에 커서를 올려 확인할
          수 있습니다.
        </span>
        <span className={styles.description_item}>
          • 손익분기점, 직전입찰가, 입찰선점가에 해당하는 값을 클릭하면 해당
          값이 복사되며, <br />
          <span className={styles.description_space}>{'• '}</span> 클립보드에
          복사되었다는 알림이 등장합니다.
        </span>
        <span className={styles.description_item}>
          • 입찰하는 것 자체가 손해로 이어질 경우는 계산하지 않습니다.
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Ticket;
