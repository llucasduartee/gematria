import React, { useState } from "react";
import TarotData from "../tarot.json";
import GematricData from "../gematricValue.json";
import "../styles/Form.css";
import Babalon from "../assets/babalon.png";

const Form = () => {
  const [getName, setGetName] = useState("");
  const [tarotCard, setTarotCard] = useState("");
  const [showTarotCard, setShowTarotCard] = useState(false);

  const calculateName = (name: string) => {
    let name_splitted = name.split(" ");
    let output = 0;
    const keys = Object.keys(GematricData);
    let result: number[] = [];
    for (let i = 0; i < name_splitted.length; i++) {
      let letter = name_splitted[i].split("");
      for (let j = 0; j < keys.length; j++) {
        keys.forEach((key, index) => {
          if (letter[j] !== undefined && letter[j].toUpperCase() === key) {
            output = GematricData[key as keyof typeof GematricData];
            result.push(output);
          }
        });
      }
    }

    const sum = result.reduce((partialSum, a) => partialSum + a, 0);
    if (sum > 22) {
      let digits = sum.toString().split("");
      let realDigits = digits.map(Number);
      const Newsum = realDigits.reduce((partialSum, a) => partialSum + a, 0);
      setTarotCard(Newsum.toString());
      setShowTarotCard(true);
    }
  };

  return (
    <div className="babalon-input">
      <img src={Babalon} className="babalon" />
      <input
        name="nome"
        placeholder="Digite seu nome"
        type="text"
        required
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setGetName(e.currentTarget.value)
        }
      />
      <br />
      <button onClick={() => calculateName(getName)}>Calcular</button>

      {showTarotCard && (
        <div className="result">
          <h4>{TarotData[tarotCard as keyof typeof TarotData].name}</h4>
          <p>{TarotData[tarotCard as keyof typeof TarotData].path_kaballah}</p>
          <img
            src={TarotData[tarotCard as keyof typeof TarotData].src}
            className="tarot"
          />
        </div>
      )}
    </div>
  );
};

export default Form;
