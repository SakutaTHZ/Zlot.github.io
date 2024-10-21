import React, { useState,useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { LuCrown } from "react-icons/lu";
import { IoMdArrowDropright } from "react-icons/io";

const History = ({ history }) => {
  const [filter, setFilter] = useState("all");
  const [current, setCurrent] = useState("History");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        setCurrent(()=>'History')
      }
      else if (event.key === "l") {
        setCurrent(()=>'LeaderBoard')
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const earningsMap = [
    {
      name: "SakutaTHZ",
      earnings: JSON.parse(localStorage.getItem("money")),
      winCount: history.filter((spin) => spin.result === "Win").length,
    },
    { name: "Alex Johnson", earnings: 3200, winCount: 32 },
    { name: "Maria Lopez", earnings: 122850, winCount: 22 },
    { name: "John Doe", earnings: 414200, winCount: 14 },
    { name: "Emma Smith", earnings: 195350, winCount: 132 },
    { name: "Olivia Brown", earnings: 334000, winCount: 543 },
    { name: "Liam Wilson", earnings: 453400, winCount: 12 },
    { name: "Noah Taylor", earnings: 243100, winCount: 69 },
    { name: "Sophia Davis", earnings: 374300, winCount: 45 },
    { name: "James White", earnings: 284400, winCount: 88 },
  ];

  const filteredHistory = history.filter((spin) => {
    if (filter === "wins") return spin.result === "Win";
    if (filter === "losses") return spin.result === "Lose";
    return true;
  });

  return (
    <div className="history flex flex-col gap-2 py-2 pt-0">
      <div>
        <button
          className={`chooseButt ${current == "History" && "active"}`}
          onClick={() => setCurrent("History")}
        >
          History
        </button>
        <button
          className={`chooseButt ${current == "LeaderBoard" && "active"}`}
          onClick={() => setCurrent("LeaderBoard")}
        >
          LeaderBoard
        </button>
      </div>
      {current == "History" && (
        <div className="historyContent animate-slideRight flex flex-col gap-2">
          <div className="historyFilters flex justify-between gap-2 mb-2 text-neutral-100">
            <button
              className={`w-full py-1 px-3 flex justify-between gap-1 ${
                filter === "all"
                  ? "bg-neutral-700 text-white"
                  : "bg-transparent border border-neutral-700"
              }`}
              onClick={() => setFilter("all")}
            >
              All <span className="allCount">{history.length}</span>
            </button>
            <button
              className={`w-full py-1 px-3 flex justify-between gap-1 ${
                filter === "wins"
                  ? "bg-green-500 text-green-500 bg-opacity-10"
                  : "bg-transparent border border-neutral-700"
              }`}
              onClick={() => setFilter("wins")}
            >
              Wins{" "}
              <span className="winCount">
                {history.filter((spin) => spin.result === "Win").length}
              </span>
            </button>

            <button
              className={`w-full py-1 px-3 flex justify-between gap-1 ${
                filter === "losses"
                  ? "bg-red-500 text-red-500 bg-opacity-10"
                  : "bg-transparent border border-neutral-700"
              }`}
              onClick={() => setFilter("losses")}
            >
              Loses{" "}
              <span className="loseCount">
                {history.filter((spin) => spin.result === "Lose").length}
              </span>
            </button>
          </div>

          {filteredHistory
            .slice()
            .reverse()
            .map((spin, spinIndex) => (
              <div
                className="historyBlock rounded-md p-3 flex flex-col gap-1  pb-4"
                key={spinIndex}
              >
                <strong className="flex  justify-between text-neutral-400 mb-2">
                  <p>
                    Spin{" "}
                    <span className="text-neutral-200">
                      {history.length - spinIndex}
                    </span>{" "}
                    at :{" "}
                    <span className="text-neutral-200">{spin.spinTime}</span>
                  </p>

                  <p
                    className={`px-4 bg-opacity-10 rounded-lg ${
                      spin.result === "Win"
                        ? "bg-green-500 text-green-500"
                        : " bg-red-500 text-red-500"
                    }`}
                  >
                    {spin.result}
                  </p>
                </strong>

                {/* Display the symbols for each column */}
                <div className="flex justify-between p-8 py-4 md:p-4 bg-neutral-900 rounded-md">
                  {spin.symbols.map((colSymbols, colIndex) => (
                    <div className="flex flex-col" key={colIndex}>
                      {colSymbols.slice(0, 3).map((symbol, index) => (
                        <span className="text-xl" key={index}>
                          {symbol}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Display Paylines Hit */}
                <div className="flex flex-col text-neutral-300">
                  <div className="p-2 py-1">
                    {spin.paylinesHit.length > 0 && (
                      <>
                        {spin.paylinesHit.map((payLine, payLineIndex) => (
                          <p
                            className="w-full flex justify-between"
                            key={payLineIndex}
                          >
                            <span>
                              {payLine.symbol} {payLine.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <RxCross2 size={10} />
                              {payLine.multiplier}
                            </span>
                          </p>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className="px-4 bg-neutral-700 bg-opacity-50 rounded-md">
                  <p className="py-1 w-full flex justify-between font-semibold">
                    <span className="pl-1">Bet</span>
                    <span className="flex items-center gap-1">{spin.bet}</span>
                  </p>
                  <p className="py-1 w-full flex justify-between font-semibold">
                    <span className="pl-1">Total</span>
                    <span className="flex items-center gap-1">
                      {spin.result === "Win" ? (
                        <FaCaretUp className="text-green-500" />
                      ) : (
                        <FaCaretDown className="text-red-500" />
                      )}
                      ${spin.totalMoney && spin.totalMoney.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}

      {current == "LeaderBoard" && (
        <div className="flex flex-col gap-8 py-5 animate-slideRight">
          <div className="EarningLeaderBoard leaderboard">
            <h1 className="text-lg px-3 pb-2">Earnings</h1>
            <ul className="flex flex-col gap-2 p-3 rounded-lg rounded-ss-none">
              {earningsMap
                .sort((a, b) => b.earnings - a.earnings)
                .map((user, index) => (
                <li
                  key={index}
                  className={`w-full flex justify-between gap-2 p-1 px-3 rounded-md hover:bg-neutral-800 ${
                    index + 1 == 1 && "highlightText"
                  } ${user.name == "SakutaTHZ" && "bg-white bg-opacity-5"}`}
                >
                  <span className="w-12">{index + 1}</span>
                  <span className="w-full flex gap-1 items-center">
                    {user.name == "SakutaTHZ" && <IoMdArrowDropright />}
                    {index + 1 == 1 && <LuCrown />}
                    {user.name}
                  </span>
                  <span className="font-semibold">
                    ${user.earnings.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="WinLeaderBoard leaderboard">
            <h1 className="text-lg px-3 pb-2">Wins</h1>

            <ul className="p-3 rounded-lg rounded-ss-none">
              {earningsMap
                .sort((a, b) => b.winCount - a.winCount)
                .map((user, index) => (
                  <li
                    key={index}
                    className={`w-full flex justify-between gap-2 p-1 px-3 rounded-md hover:bg-neutral-800 ${
                      index + 1 == 1 && "highlightText"
                    } ${user.name == "SakutaTHZ" && "bg-white bg-opacity-5"}`}
                  >
                    <span className="w-12">{index + 1}</span>
                    <span className="w-full flex gap-1 items-center">
                      {user.name == "SakutaTHZ" && <IoMdArrowDropright />}
                      {index + 1 == 1 && <LuCrown />}
                      {user.name}
                    </span>
                    <span className="font-semibold">{user.winCount}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
