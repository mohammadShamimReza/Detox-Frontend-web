"use client";
import { useUpdateUserDayMutation } from "@/redux/api/authApi";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeCurrentTask } from "@/redux/slice/taskSlice";
import { KegelTimes, Quizzes } from "@/types/contantType";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompliteTask from "./CompliteTask";
import TaskPage from "./TaskPage";

function AuthMyTask({
  authDayDataId,
  userId,
  paid,
}: {
  authDayDataId: number;
  userId: number;
  paid: boolean | undefined;
}) {
  const router = useRouter();

  const tasks = ["video", "kagel", "quiz", "Blog"];

  const [dayId, setDayId] = useState(authDayDataId);

  const { data: authenticatedDayData, isError } =
    useGetDaysByDayIdQuery(authDayDataId);

  const [updataUserDay] = useUpdateUserDayMutation();

  const currentTask = useAppSelector((state) => state.taskSlice.currentTask);
  const dispatch = useAppDispatch();

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const selectedTask = currentTask || tasks[selectedTaskIndex];
  const initialLocalStorageData = localStorage.getItem("AuthDay");
  const defaultLocalStorageData = {
    video: false,
    kagel: false,
    quiz: false,
    Blog: false,
  };
  const [localStorageData, setLocalStorageData] = useState(
    initialLocalStorageData
      ? JSON.parse(initialLocalStorageData)
      : defaultLocalStorageData
  );
  useEffect(() => {
    localStorage.setItem("AuthDay", JSON.stringify(localStorageData));
  }, [localStorageData]);

  const handleTaskClick = (index: number) => {
    setSelectedTaskIndex(index);
    dispatch(storeCurrentTask(tasks[index]));
  };

  const handlePrevious = () => {
    if (selectedTaskIndex > 0) {
      setSelectedTaskIndex(selectedTaskIndex - 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex - 1]));
    }
  };
  console.log(selectedTask, "this is");

  const handleNext = async () => {
    if (selectedTask === "Blog") {
      console.log("blog");
      dispatch(storeCurrentTask(tasks[0]));
      localStorage.setItem("AuthDay", JSON.stringify(defaultLocalStorageData));
      if (authDayDataId + 1 === 120) {
        message.success(
          "Hurray this is you last day of task. Then you becone spartan"
        );
        await updataUserDay({
          currentDay: authDayDataId + 1,
          compliteDay: authDayDataId,
          userId: userId,
        });
        router.push("/blog");
      } else if (authDayDataId + 1 > 120) {
        message.success(
          "Congratulations you have successfully completed your tasks for 120 day"
        );

        window.location.reload();
      } else if (authDayDataId + 1 <= 121) {
        message.success(
          "Congratulations you have successfully completed your tasks for 120 day"
        );
        await updataUserDay({
          currentDay: authDayDataId + 1,
          compliteDay: authDayDataId,
          userId: userId,
        });
        router.push("/blog");
      }
    } else {
      setLocalStorageData((prevState: typeof localStorageData) => ({
        ...prevState,
        [selectedTask]: true,
      }));
    }
    if (selectedTaskIndex < tasks.length - 1) {
      setSelectedTaskIndex(selectedTaskIndex + 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex + 1]));
    }
  };

  const [blog, setBlog] = useState<{
    id: number | undefined;
    title: string | undefined;
    content: string | undefined;
  }>({
    id: 1,
    title: "",
    content: "",
  });
  const [kegel, setKegel] = useState<KegelTimes[] | undefined>(undefined);
  const [quiz, setQuiz] = useState<Quizzes[] | undefined>(undefined);

  const [video, setVideo] = useState<{ videoUrl: string | undefined }>({
    videoUrl: "",
  });

  useEffect(() => {
    if (authenticatedDayData) {
      const authDayData = authenticatedDayData?.data[0].attributes;
      if (authDayData) {
        setBlog({
          id: authDayData.blog.data.id,
          title: authDayData.blog.data.attributes.title,
          content: authDayData.blog.data.attributes.content,
        });
        setQuiz(authDayData?.quizzes.data);

        setVideo({ videoUrl: authDayData.video.data.attributes.VideoUrl });
        setKegel(authDayData?.kegel.data.attributes.kegel_times.data);
      }
    }
  }, [authenticatedDayData]);

  const DayCount = authDayDataId;
  const handleDayid = (id: string) => {
    console.log(dayId);
    setDayId(parseInt(id));
  };
  return (
    <>
      {DayCount > 120 ? (
        <CompliteTask auth={true} daysCompleted={120} />
      ) : (
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
            video={video}
            kegel={kegel}
            DayCount={DayCount}
            handleDayid={handleDayid}
            paid={paid}
          />
        </>
      )}
    </>
  );
}

export default AuthMyTask;
