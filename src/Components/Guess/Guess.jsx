import React, { useState } from "react";
import Confetti from "react-confetti";
const Guess = () => {
  const [guess, setGuess] = useState("");
  const [generatedNum, setGeneratedNum] = useState("");
  const [message, setMessage] = useState("Guess the number from 1 to 100");
  const [isWinner, setIsWinner] = useState(false);
  let [count, setCount] = useState(0);
  let [remaining, setRemaining] = useState(4);

  const [generate, setGenerate] = useState("Generate");
  const [isdisabled, setDisabled] = useState(false);

  const handleGenerate = () => {
    const randomNum = Math.random();
    const num = Math.floor(randomNum * 100);
    setGeneratedNum(num);
    setCount(0);
    setRemaining(4);
    console.log(num);
    setMessage("Number Generated! Start Guessing");
    setIsWinner(false);
    setGenerate("Generating");
    setDisabled(true);
    setTimeout(() => {
      setGenerate("Generated");
    }, 1000);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setGuess(value);
  };

  const handleGuess = () => {
    if (generatedNum == guess && generatedNum != "" && guess != "") {
      console.log("You Guess it Right");
      setIsWinner(true);
      setMessage("Congratulations! You Guess it Right");
      setTimeout(() => setIsWinner(false), 5000);
      setGuess("");
    } else if (generatedNum == "" && guess == "") {
      setMessage("First Generate and guess the number");
    } else if (generatedNum == "" || guess == "") {
      setMessage("First Generate and guess the number");
    } else if (guess == "") {
      setMessage("Enter your guess number");
    } else if (generatedNum == "") {
      setMessage("First Generate the number");
    } else {
      console.log("You Guess it wrong");
      setMessage(`You Guess it wrong, Attempt remaining ${remaining}`);
      setCount(count);
      setRemaining(remaining);

      if (generatedNum - guess > 15 || generatedNum - guess < -15) {
        setMessage(`Your Guess it too far, Attempt remaining ${remaining}`);
      } else if (generatedNum > guess) {
        setMessage(
          `The number is greater than ${guess}, Attempt remaining ${remaining}`
        );
      } else if (guess > generatedNum) {
        setMessage(
          `The number is less than ${guess}, Attempt remaining ${remaining}`
        );
      }

      setGuess("");
      if (count > 3) {
        setMessage(
          `Your attempt is finished. The Correct Number is ${generatedNum}`
        );
      }
    }
  };
  count++;
  remaining--;

  return (
    <>
      <div className="container w-full h-96 flex flex-col justify-center items-center gap-8">
        <h1 className="text-3xl font-bold bg-gray-700 p-2 rounded-xl">
          Guess The Number Game
        </h1>
        <div className="myBtn flex gap-4 items-center">
          <label htmlFor="">From 0 to 100</label>
          <button
            className="pl-4 pr-4 pt-2 pb-2 bg-green-700 rounded-xl hover:bg-green-800 load"
            disabled={isdisabled}
            onClick={handleGenerate}
          >
            {generate}
          </button>
        </div>
        <div className="num flex flex-row gap-6 items-center justify-center">
          <input
            type="number"
            className="bg-gray-700 pl-3 pr-3 pt-2 pb-2 rounded outline-none w-40"
            value={guess}
            onChange={handleInput}
            placeholder="Enter Number"
          />
          <button
            className="pl-4 pr-4 pt-2 pb-2 bg-sky-800 hover:bg-sky-900 rounded-xl"
            onClick={handleGuess}
          >
            Guess
          </button>
        </div>
        <p className="text-center para">{message}</p>
        {isWinner && (
          <Confetti
            style={{
              background: "transparent",
              pointerEvents: "block",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            hello
          </Confetti>
        )}
      </div>
    </>
  );
};

export default Guess;
