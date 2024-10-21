import ProfileImage from "../assets/Pictures/Profile.jpg";
import { useState } from "react";
import useSound from "use-sound";
import buySound from "../assets/sfx/buy.mp3";
import topupSound from "../assets/sfx/topup.mp3";
import failSound from "../assets/sfx/Fail.mp3";
import confetti from "canvas-confetti";

const Profile = ({ money, setMoney, setShowMessage, setMessage }) => {
  const [showTopUpBox, setShowTopUpBox] = useState(false);
  const [showWithdrawBox, setShowWithdrawBox] = useState(false);
  const [buyPlayer] = useSound(buySound);
  const [topupPlayer] = useSound(topupSound);
  const [failPlayer] = useSound(failSound);

  // Handle top up
  const handleTopUp = (amount) => {
    const updatedMoney = money + amount;
    setMoney(() => updatedMoney);
    setMessage(() => `You Top Up $${amount}`);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0 },
    });
    localStorage.setItem("money", updatedMoney);
    JSON.parse(localStorage.getItem("sound")) && topupPlayer();
  };

  // Handle withdraw
  const handleWithdraw = (amount) => {
    if (money - amount < 0) {
      setMessage(() => `You Can't Withdrew More than you have`);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      JSON.parse(localStorage.getItem("sound")) && failPlayer();
    } else {
      const updatedMoney = money - amount;
      setMoney(() => updatedMoney);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      setMessage(() => `You Withdrew $${amount}`);
      localStorage.setItem("money", updatedMoney);
      JSON.parse(localStorage.getItem("sound")) && buyPlayer();

      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0 },
        shapes: ['star']
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4 py-4 border-b border-neutral-700">
        <h1 className="text-2xl pb-1">Profile</h1>
        <div className="profileCard default flex items-center p-3 rounded-md">
          <img
            src={ProfileImage}
            alt="profile"
            className="h-6 rounded-full border"
          />
          <div className="px-2 flex items-center gap-2">
            <p className="name text-lg font-semibold">SakutaTHZ</p>
            <div className="titles flex gap-1">
              <span className="title text-xs bg-white h-fit py-1 px-2 rounded-xl bg-opacity-20">
                Winner
              </span>
              <span className="title text-xs bg-white h-fit py-1 px-2 rounded-xl bg-opacity-20">
                #1
              </span>
            </div>
          </div>
        </div>

        <div className="balanceCard default p-3 rounded-md overflow-hidden">
          <div className="w-full pb-2">
            <h1 className="text-lg pb-1 flex items-center gap-2">
              <p className="text-base text-nowrap">Balance</p>
              <span className="bg-white w-full h-fit py-1 px-2 rounded-xl bg-opacity-5">
                $ {money.toLocaleString()}
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            {/* Buttons for Top Up and Withdraw */}
            <div className="buttons flex gap-2">
              <button
                className="balanceButton w-full py-1"
                onClick={() => {
                  setShowTopUpBox(true);
                  setShowWithdrawBox(false);
                }}
              >
                Top Up
              </button>
              <button
                className="balanceButton w-full py-1"
                onClick={() => {
                  setShowWithdrawBox(true);
                  setShowTopUpBox(false);
                }}
              >
                Withdraw
              </button>
            </div>

            {/* Top Up Amount Box */}
            {showTopUpBox && (
              <div className="animate-slideLeft topupBox flex flex-col gap-2 topUpBox p-2 border border-neutral-700 rounded-md">
                <p className="text-base text-nowrap">Top Up Amount</p>
                <div className="amounts grid grid-cols-3 gap-2">
                  {[100, 300, 500, 1000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      className="topupButton shadow-md w-full border rounded-md px-2 py-1"
                      onClick={() => handleTopUp(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Withdraw Amount Box */}
            {showWithdrawBox && (
              <div className="animate-slideRight withdrawBox flex flex-col gap-2 topUpBox p-2 border border-neutral-700 rounded-md">
                <p className="text-base text-nowrap">Withdraw Amount</p>
                <div className="amounts grid grid-cols-3 gap-2">
                  {[100, 300, 500, 1000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      className="topupButton shadow-md w-full border rounded-md px-2 py-1"
                      onClick={() => handleWithdraw(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
