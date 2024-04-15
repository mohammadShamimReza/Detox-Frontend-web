import { KegelTimes } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";
import { useEffect, useRef, useState } from "react";

function Kagel({
  selectedTask,
  kegel,
}: {
  selectedTask: string;
  kegel: KegelTimes[] | undefined;
}) {
  function getKegelTimes(text: string) {
    const numbersArray = text.split(/,\s*/);
    return numbersArray.map(Number);
  }

  const [times, setTimes] = useState<number>(0);
  const [kegelTimes, setKegelTimes] = useState<number[]>([2, 3]);

  useEffect(() => {
    if (kegel && kegel.length > 0 && kegel[times]?.attributes.times) {
      const newTimes = getKegelTimes(kegel[times]?.attributes.times);
      setKegelTimes(newTimes);
    }
  }, [kegel, times]); // Run this effect only when `kegel` changes

  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    kegelTimes[currentTimeIndex] * 1000
  );

  const [timeLeft, setTimeLeft] = useState(currentTime);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [type, setType] = useState("");

  const timerId = useRef<NodeJS.Timeout | undefined | number>(undefined);

  const startTimer = () => {
    // clearInterval(timerId.current);

    if (progressBarPercent === 100) {
      setTimeLeft(currentTime);
      setProgressBarPercent(0);
    }
    setIsRunning(true);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      timerId.current = window.setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 100);
      }, 100);

      return () => clearInterval(timerId.current);
    }
  }, [isRunning]);

  useEffect(() => {
    currentTimeIndex % 2 === 0 ? setType("Squizz") : setType("Stop");

    if (progressBarPercent < 100) {
      let updateProgressPercent = Math.round(
        ((currentTime - timeLeft) / currentTime) * 100
      );
      setProgressBarPercent(updateProgressPercent);
    } else if (progressBarPercent === 100) {
      if (currentTimeIndex + 1 === kegelTimes.length) {
        clearInterval(timerId.current);
        setIsRunning(false);
      } else {
        setCurrentTimeIndex(currentTimeIndex + 1);
        setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
        setProgressBarPercent(0);

        setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
      }
    }
  }, [
    currentTime,
    currentTimeIndex,
    timeLeft,
    isRunning,
    kegelTimes,
    progressBarPercent,
  ]);

  const handlePrevious = () => {
    if (kegel && kegel.length > 0 && times > 0) {
      setTimes(times - 1);
      setCurrentTimeIndex(0);
      setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
      setProgressBarPercent(0);

      setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
    }
  };

  const handleNext = () => {
    if (kegel && times < kegel.length - 1) {
      setTimes(times + 1);
      setCurrentTimeIndex(0);
      setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
      setProgressBarPercent(0);

      setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
    }
  };
  return (
    <div>
      {selectedTask === "kagel" && (
        <div className="flex flex-col items-center ">
          <p className="text-2xl">
            {type}, {currentTime / 1000}s, {kegel?.length}/{times + 1}
          </p>
          <div className="mb-10 flex justify-center">
            <Progress percent={progressBarPercent} type="circle" size={200} />
          </div>
          <Button.Group>
            <Button onClick={startTimer}>Start</Button>
            <Button onClick={stopTimer}>Stop</Button>
          </Button.Group>
          <div className="basis-1/6 flex justify-center align-bottom flex-col">
            <div className="flex justify-between mt-4 gap-5">
              <button
                className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700
                ${
                  times === 0 || !kegel || kegel.length === 0
                    ? "bg-gray-500 cursor-not-allowed "
                    : "bg-gray-700 hover:bg-gray-700"
                }
                `}
                onClick={handlePrevious}
                disabled={times === 0 || !kegel || kegel.length === 0}
              >
                <span style={{ paddingRight: "10px" }}>
                  {" "}
                  <ArrowLeftOutlined />
                </span>
                Previous
              </button>

              <button
                className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700"
                   ${
                     !kegel || times === kegel.length - 1
                       ? "bg-gray-500 cursor-not-allowed "
                       : "bg-gray-700 hover:bg-gray-700"
                   }`}
                onClick={handleNext}
                disabled={!kegel || times === kegel.length - 1}
              >
                Next
                <span style={{ paddingLeft: "10px" }}>
                  <ArrowRightOutlined />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kagel;
