"use client";
import React, { useState } from "react";

const MyTasks: React.FC = () => {
  const tasks = ["video", "sortNote", "quiz", "rewards", "suggestBlog"];
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedTaskIndex < tasks.length - 1) {
      setSelectedTaskIndex(selectedTaskIndex + 1);
    }
  };

  const selectedTask = tasks[selectedTaskIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Task List */}
        <div className="lg:w-1/3 pr-8 mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold ">Your Task for Today</h2>
          <ul className="list-decimal pl-6">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`mb-2 cursor-pointer transition-colors duration-300 ${
                  selectedTask === task && "font-bold text-blue-600"
                }`}
                onClick={() => handleTaskClick(index)}
              >
                {task.replace(/^\w/, (c) => c.toUpperCase())}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Task Details */}
        <div className="lg:w-2/3">
          <div
            style={{ height: "600px" }}
            className="p-4 rounded-lg shadow-lg bg-white   mx-auto flex flex-col justify-evenly "
          >
            <div className="">
              <h3 className="text-xl font-bold ">
                {selectedTask.replace(/^\w/, (c) => c.toUpperCase())}
              </h3>
            </div>
            <div className="">
              {selectedTask === "video" && (
                <div className="">
                  <iframe
                    width="100%"
                    height="450px"
                    src={`https://www.youtube.com/embed/RBSGKlAvoiM`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
                /* Add video component here */
              )}
              {selectedTask === "sortNote" && (
                <p className="">
                  Reflect on your progress and thoughts with short note-taking
                  exercises.
                </p>
                /* Add note sorting component here */
              )}
              {selectedTask === "quiz" && (
                <p className="">
                  Reinforce learning and test your knowledge with engaging
                  quizzes.
                </p>
                /* Add quiz component here */
              )}
              {selectedTask === "rewards" && (
                <p className="">
                  Stay committed and earn rewards for completing tasks.
                </p>
                /* Add rewards component here */
              )}
              {selectedTask === "suggestBlog" && (
                <p className="">
                  Receive personalized suggestions for blog articles related to
                  recovery and mindfulness.
                </p>
                /* Add suggested blog component here */
              )}
            </div>
            <div className="">
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none"
                  onClick={handlePrevious}
                  disabled={selectedTaskIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none"
                  onClick={handleNext}
                  disabled={selectedTaskIndex === tasks.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;