"use client";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { KegelTimes } from "@/types/contantType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskPage from "./TaskPage";

function UnAuthTask({}) {
  const router = useRouter();

  const tasks = [
    "video",
    "kagel",
    "sortNote",
    "quiz",
    "rewards",
    "suggestBlog",
  ];

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const selectedTask = tasks[selectedTaskIndex];

  const initialLocalStorageData = localStorage.getItem("UnAuthDay");
  const defaultLocalStorageData = {
    video: false,
    kagel: false,
    sortNote: false,
    quiz: false,
    rewards: false,
    suggestBlog: false,
  };

  const [localStorageData, setLocalStorageData] = useState(
    initialLocalStorageData
      ? JSON.parse(initialLocalStorageData)
      : defaultLocalStorageData
  );

  // Update local storage whenever localStorageData changes
  useEffect(() => {
    localStorage.setItem("UnAuthDay", JSON.stringify(localStorageData));
  }, [localStorageData]);

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
    }
  };
  const handleNext = () => {
    setLocalStorageData((prevState: typeof localStorageData) => ({
      ...prevState,
      [selectedTask]: true,
    }));
    console.log("third");

    if (selectedTask === "suggestBlog") {
      let unAuthDayId = localStorage.getItem("unAuthDayId");
      localStorage.setItem(
        "UnAuthDay",
        JSON.stringify({
          video: false,
          kagel: false,
          sortNote: false,
          quiz: false,
          rewards: false,
          suggestBlog: false,
        })
      );

      if (unAuthDayId === null) {
        localStorage.setItem("unAuthDayId", "1");
      } else if (unAuthDayId !== null) {
        let parsedUnAuthDayId = parseInt(unAuthDayId) + 1;
        localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
        router.push("/");
      }
      router.push("/");
    }
    if (selectedTaskIndex < tasks.length - 1) {
      setSelectedTaskIndex(selectedTaskIndex + 1);
    }
  };
  const [unAuthDayId, setUnAuthDayId] = useState("1");
  useEffect(() => {
    setUnAuthDayId(window.localStorage.getItem("unAuthDayId") || "1");
  }, []);

  const { data: unAuthenticatedDayData, isError } = useGetDaysByDayIdQuery(
    parseInt(unAuthDayId)
  );

  const [blog, setBlog] = useState<{
    title: string | undefined;
    content: string | undefined;
  }>({
    title: "",
    content: "",
  });
  const [kegel, setKegel] = useState<KegelTimes[] | undefined>(undefined);
  const [quiz, setQuiz] = useState<{
    question: string | undefined;
    answer: string | undefined;
    quizOptions: string | undefined;
  }>({
    question: "",
    answer: "",
    quizOptions: "",
  });
  const [sort_note, setSort_note] = useState<{
    sortNoteContent: string | undefined;
  }>({
    sortNoteContent: "",
  });
  const [video, setVideo] = useState<{ videoUrl: string | undefined }>({
    videoUrl: "",
  });
  const [reward, setReward] = useState<{ rewardContant: string | undefined }>({
    rewardContant: "",
  });

  useEffect(() => {
    if (unAuthenticatedDayData) {
      const authDayData = unAuthenticatedDayData?.data[0].attributes;
      if (authDayData) {
        setBlog({
          title: authDayData.blog.data.attributes.title,
          content: authDayData.blog.data.attributes.content,
        });
        setQuiz({
          answer: authDayData.quiz.answer,
          question: authDayData.quiz.question,
          quizOptions: authDayData.quiz.quizOptions,
        });
        setSort_note({
          sortNoteContent:
            authDayData.sort_note.data.attributes.sortNoteContent,
        });
        setVideo({ videoUrl: authDayData.video.data.attributes.VideoUrl });
        setReward({ rewardContant: authDayData.reward });

        setKegel(authDayData?.kegel.data.attributes.kegel_times.data);
      }
    }
  }, [unAuthenticatedDayData, unAuthDayId]);
  return (
    <>
      <TaskPage
        localStorageData={localStorageData}
        handleTaskClick={handleTaskClick}
        selectedTask={selectedTask}
        selectedTaskIndex={selectedTaskIndex}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        blog={blog}
        quiz={quiz}
        sort_note={sort_note}
        video={video}
        reward={reward}
        kegel={kegel}
      />
    </>
  );
}

export default UnAuthTask;