// src/Pages/convertedcard.jsx
import React from "react";

const ConverterCard = (props) => {
  // friendly names pulled from currSymbol mapping (e.g. "SGD" => "Singapore dollar")
  const from = props.currSymbol[props.from] || props.from;
  const to = props.currSymbol[props.to] || props.to;

  // try to extract a numeric rate from props.convert
  // Frankfurter returns an object like { date, amount, base, rates: { "MYR": 3.2 } }
  let rateNumber = 1;
  if (props.convert) {
    if (props.convert.rates && Object.values(props.convert.rates).length > 0) {
      rateNumber = Number(Object.values(props.convert.rates)[0]);
    } else if (typeof props.convert === "number") {
      rateNumber = props.convert;
    } else if (props.convert.rate && !isNaN(Number(props.convert.rate))) {
      rateNumber = Number(props.convert.rate);
    }
  }

  const forMap = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];

  const formatAmount = (n) => {
    // limit to 4 decimal places like your original code
    return Math.ceil(n * 10000) / 10000;
  };

  return (
    <>
      <div className="card converter-card shadow border">
        <div className="card-header converter-card-header">
          <h5 className="row converter-card-header">{`Convert ${from} to ${to}`}</h5>
          <div className="row">
            <div className="col-sm-6">
              <h5>{`${props.emojiFlags?.[props.from] ?? ""} ${props.from}`}</h5>
            </div>
            <div className="col-sm-6">
              <h5>{`${props.emojiFlags?.[props.to] ?? ""} ${props.to}`}</h5>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {forMap.map((item, idx) => {
              return (
                <div className="row converter-list" key={idx}>
                  <div className="col-sm-6 centered">{`${item} ${props.from}`}</div>
                  <div className="col-sm-6 centered">{`${formatAmount(
                    item * rateNumber
                  )} ${props.to}`}</div>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </>
  );
};

export default ConverterCard;
