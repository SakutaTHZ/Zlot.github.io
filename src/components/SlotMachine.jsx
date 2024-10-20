import React, { useEffect, useState, useRef } from "react";
import Reel from "./Reels";
import History from "./History";
import StatusNav from "./StatusNav";
import ProfileNav from "./ProfileNav";
import { CgSpinner } from "react-icons/cg";
import ThemeBox from "./ThemeBox";
import Profile from "./Profile";
import MessagePopUp from "./MessagePopUp";
import useSound from "use-sound";
import introSound from "../assets/sfx/introsfx.mp3";
import { MdInfo, MdMusicNote, MdMusicOff } from "react-icons/md";

const SlotMachine = () => {
  const [intro] = useSound(introSound);

  const [money, setMoney] = useState(
    Number(localStorage.getItem("money")) || 10000
  );
  const [history, setHistory] = useState([]);
  const reelRef = useRef(null);

  const [autoSpinning, setAutoSpinning] = useState(false);
  const [totalSpinCount, setTotalSpinCount] = useState(10);
  const [spinCount, setSpinCount] = useState(0);
  const intervalRef = useRef(null);

  const [bet, setBet] = useState(1);

  const [showMessage, setShowMessage] = useState(false);

  const [message, setMessage] = useState("Error");

  const [ismuted, setIsMuted] = useState(
    JSON.parse(localStorage.getItem("sound"))
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "m") {
        toggleMusic();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "a") {
        console.log("auto spin");
        autoSpinning ? stopAutoSpin() : startAutoSpin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [autoSpinning]);

  const startAutoSpin = () => {
    {
      autoSpinning ? setAutoSpinning(false) : setAutoSpinning(true);
    }
    setSpinCount(0);
    JSON.parse(localStorage.getItem("sound")) && intro();
  };

  const stopAutoSpin = () => {
    setAutoSpinning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleAutoSpin = () => {
    intervalRef.current = setInterval(() => {
      handleLeverClick();

      setSpinCount((spinCount) => {
        if (spinCount + 1 >= totalSpinCount) {
          stopAutoSpin();
          return 0;
        }
        return spinCount + 1;
      });
    }, 4000);
  };

  const calculateTotalSpinCount = (amount) => {
    if (amount + totalSpinCount >= 1) {
      setTotalSpinCount((prevTotal) => prevTotal + amount);
    }
  };

  const calculateTotalBetCount = (amount) => {
    if (amount + bet >= 1) {
      setBet((prevTotal) => prevTotal + amount);
    }
  };

  useEffect(() => {}, [totalSpinCount]);

  useEffect(() => {
    if (autoSpinning) {
      handleAutoSpin();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoSpinning]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("slotHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const saveHistory = (symbols) => {
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, symbols];

      localStorage.setItem("slotHistory", JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  };

  const handleLeverClick = () => {
    if (reelRef.current) {
      reelRef.current.regenerateSymbols();
    }
  };

  const toggleMusic = () => {
    const newSoundStatus = !JSON.parse(localStorage.getItem("sound"));
    localStorage.setItem("sound", newSoundStatus);

    setIsMuted(newSoundStatus);
  };

  return (
    <>
      <div className="slotMachine default scale-75 md:scale-100">
        <div className="lights leftLights">
          {Array.from({ length: 10 }, (_, index) => (
            <span
              key={index}
              className="light"
              style={{ animationDelay: `${index * 0.5}s` }}
            ></span>
          ))}
        </div>
        <div className="lights rightLights">
          {Array.from({ length: 10 }, (_, index) => (
            <span
              key={index}
              className="light"
              style={{ animationDelay: `${index * 0.1}s` }}
            ></span>
          ))}
        </div>

        <div className={`lever`} onClick={handleLeverClick}>
          <div className="rod">
            <div className="ball"></div>
          </div>
        </div>
        <Reel
          ref={reelRef}
          money={money}
          setMoney={setMoney}
          saveHistory={saveHistory}
          bet={bet}
        />

        <div className="cube-wrap">
          <div className="dataBox bet-dataBox flex">
            <span className="text-white text-nowrap">Your Bet - </span>{" "}
            <input
              type="number"
              value={bet}
              placeholder="10"
              className="bg-transparent w-full text-white px-2"
              onChange={(e) => setBet(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="dataBox spin-dataBox flex">
            <span className="text-white text-nowrap">Total Spin - </span>{" "}
            <input
              type="number"
              value={totalSpinCount}
              placeholder="10"
              className="bg-transparent w-full text-white px-2"
              onChange={(e) => setTotalSpinCount(Number(e.target.value))}
              min="1"
            />
          </div>
          <div className="cube flex justify-center items-center gap-5">
            <div className="betBox w-4/12 flex flex-col gap-1">
              <div className="flex justify-between gap-3 h-8">
                <button
                  className="flex justify-center items-center w-full"
                  onClick={() => calculateTotalBetCount(1)}
                >
                  +
                </button>
                <button
                  className="flex justify-center items-center w-full"
                  onClick={() => calculateTotalBetCount(-1)}
                >
                  -
                </button>
              </div>
            </div>

            <button
              className="h-full w-32 flex justify-center items-center"
              onClick={startAutoSpin}
            >
              <span className={`${autoSpinning ? "hidden" : "block"}`}>
                Auto Spin
              </span>
              <span
                className={`absolute text-sm ${
                  autoSpinning ? "block" : "hidden"
                }`}
              >
                {totalSpinCount - spinCount}
              </span>
              <span>
                <CgSpinner
                  size={50}
                  className={`animate-spin ${
                    autoSpinning ? "block" : "hidden"
                  }`}
                />
              </span>
            </button>

            <div className="spinBox w-4/12 flex flex-col gap-1">
              <div className="flex justify-between gap-3 h-8">
                <button
                  className="flex justify-center items-center w-full"
                  onClick={() => calculateTotalSpinCount(1)}
                >
                  +
                </button>
                <button
                  className="flex justify-center items-center w-full"
                  onClick={() => calculateTotalSpinCount(-1)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatusNav>
        <History history={history} />
      </StatusNav>

      <ProfileNav>
        <Profile
          money={money}
          setMoney={setMoney}
          setShowMessage={setShowMessage}
          setMessage={setMessage}
        />
        <ThemeBox />
        <div className="controls lex flex-col justify-center gap-4 py-4 border-b border-neutral-700">
          <h1 className="text-2xl pb-1">Controls</h1>
          <div className="commandsBlock p-3 rounded-md grid grid-cols-2">
            <b>Spacebar</b>
            <p className="text-sm">Spin One Time</p>
            <b>a</b>
            <p className="text-sm">Auto Spin</p>
            <b>Esc</b>
            <p className="text-sm">Open Profile and Setting</p>
            <b>Tab</b>
            <p className="text-sm">Open History</p>
            <b>l</b>
            <p className="text-sm">Open LeaderBoard</p>
            <b>T</b>
            <p className="text-sm">Change Theme</p>
            <b>m</b>
            <p className="text-sm">Mute</p>
          </div>
        </div>
        <div className="options w-full flex gap-2 py-2">
          <button onClick={toggleMusic}>
            {ismuted ? <MdMusicNote /> : <MdMusicOff />}
          </button>
          <a href="https://github.com/SakutaTHZ/Zlot/wiki" className="w-full cursor-pointer">Instructions</a>
          <a href="https://tharhtetzan.netlify.app" className="w-20"><MdInfo/></a>
        </div>
      </ProfileNav>

      {showMessage && <MessagePopUp message={message} />}
    </>
  );
};

export default SlotMachine;
