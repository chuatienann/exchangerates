import React, { useState, useEffect, useRef } from "react";
import CurrencyCard from "./CurrencyCard";
import useGet from "../Hooks/useGet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Converter = (props) => {
  const dateRef = useRef(); // references the <input type="date"> field so its value can be read directly

  // state
  const [reverse, setReverse] = useState(false);

  // function
  const handleReverse = () => {
    let a, b;
    [a, b] = [props.selection.from, props.selection.to];
    props.setSelection((currState) => {
      return { ...currState, from: b, to: a };
    });
    setReverse(true);
  };

  const handleDate = () => { // Updates the date in the selection state whenever the user picks a new date.
    props.setSelection((currState) => {
      return { ...currState, date: dateRef.current.value };
    });
  };

  //use effect
  useEffect(() => {
    props.getCurrSymbol(); // fetch currency symbols once on component mount
  }, []);

  useEffect(() => {
    props.getConvert(); // fetch conversion rate when selection state changes
  }, [props.selection]);

  return (
    <>
      <div className="row">
        <h4>Currency</h4>
      </div>
      <div className="row">
        <div className="col-sm-5">
          <CurrencyCard
            currSymbol={props.currSymbol}
            setSelection={props.setSelection}
            selection={props.selection}
            setReverse={setReverse}
            reverse={reverse}
            convert={props.convert}
            emojiFlags={props.emojiFlags}
          ></CurrencyCard>
        </div>
        <div className="col-sm-2 centered">
          <button
            onClick={handleReverse}
            className="reverse-btn btn btn-outline-primary"
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </button>
        </div>
        <div className="col-sm-5">
          <CurrencyCard
            currSymbol={props.currSymbol}
            setSelection={props.setSelection}
            selection={props.selection}
            setReverse={setReverse}
            reverse={reverse}
            convert={props.convert}
            emojiFlags={props.emojiFlags}
            to={true}
            disabled={true}
          ></CurrencyCard>
        </div>
      </div>
      <div className="row">
        <label className="col-sm-1" style={{ alignSelf: 'center' }}>
          Date:
        </label>
        <input
          className="col-sm-4 boxes boxes-h"
          type="date"
          defaultValue={props.todayDate}
          max={props.todayDate}
          ref={dateRef}
          onChange={handleDate}
        ></input>
        <div className="col-sm-2"></div>
        <p className="col-sm-5 last-update">
         {`Last updated ${props.todayDate}`}
        </p>
      </div>
    </>
  );
};

export default Converter;