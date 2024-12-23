"use client";
import { useGetDaysByDayIdQuery } from "@/redux/api/dayApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeCurrentTask } from "@/redux/slice/taskSlice";
import { KegelTimes, Quizzes } from "@/types/contantType";
import { Button, message, Modal, Skeleton } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompliteTask from "./CompliteTask";
import TaskPage from "./TaskPage";

import { clearDayData } from "@/redux/slice/daySlice";
import DayFinishImage from "../assets/dayFinish.gif";

function UnAuthTask({ paid }: { paid: boolean | undefined }) {
  const router = useRouter();
  const [unAuthDayId, setUnAuthDayId] = useState("1");

  const {
    data: unAuthenticatedDayDataForChengeDay,
    isError,
    isLoading,
  } = useGetDaysByDayIdQuery(parseInt(unAuthDayId));

  const unAuthenticatedDayData = unAuthenticatedDayDataForChengeDay?.data;

  useEffect(() => {
    const dayId = window.localStorage.getItem("unAuthDayId") || "1";
    if (parseInt(dayId) > 3) {
      router.push("/CompletedFreeTask");
    }
    setUnAuthDayId(dayId);
  }, [router]);

  const tasks = ["video", "kagel", "quiz", "Blog"];

  const currentTask = useAppSelector((state) => state.taskSlice.currentTask);
  const dispatch = useAppDispatch();

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const selectedTask = currentTask || tasks[selectedTaskIndex];

  const initialLocalStorageData = localStorage.getItem("UnAuthDay");
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

  // Update local storage whenever localStorageData changes
  useEffect(() => {
    localStorage.setItem("UnAuthDay", JSON.stringify(localStorageData));
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

  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const handleNext = () => {
    if (selectedTask === "Blog") {
      setLocalStorageData((prevState: typeof localStorageData) => ({
        ...prevState,
        [selectedTask]: true,
      }));
      setLocalStorageData(defaultLocalStorageData);
      setSelectedTaskIndex(selectedTaskIndex + 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex + 1]));
      dispatch(clearDayData());
      setSelectedTaskIndex(0);
      setIsFinishModalOpen(true);

      dispatch(storeCurrentTask(tasks[0]));
      localStorage.setItem(
        "UnAuthDay",
        JSON.stringify(defaultLocalStorageData)
      );

      if (unAuthDayId === null) {
        localStorage.setItem("unAuthDayId", "1");
      } else if (unAuthDayId !== null) {
        let parsedUnAuthDayId = parseInt(unAuthDayId) + 1;
        if (parsedUnAuthDayId === 3) {
          message.success(
            " This is you last day of free task. Upgrade membership to access pro contants"
          );
          localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
          router.push("/freeBlog");
        } else if (parsedUnAuthDayId > 3) {
          message.success(
            "Congratulations you have successfully completed your tasks for 3 day"
          );
          router.push("/CompletedFreeTask");

          window.location.reload();
        }
        if (parsedUnAuthDayId <= 4) {
          localStorage.setItem("unAuthDayId", parsedUnAuthDayId.toString());
        }
      }
    } else {
      setLocalStorageData((prevState: typeof localStorageData) => ({
        ...prevState,
        [selectedTask]: true,
      }));
      setSelectedTaskIndex(selectedTaskIndex + 1);
      dispatch(storeCurrentTask(tasks[selectedTaskIndex + 1]));
    }
    // if (selectedTaskIndex < tasks.length - 1) {

    // }
  };

  const handleOk = () => {
    setIsFinishModalOpen(false);
    router.push("/freeBlog");
  };

  const [blog, setBlog] = useState<{
    id: number | undefined;

    title: string | undefined;
    content: string | undefined;
    viewCount: number;
  }>({
    id: 1,

    title: "",
    content: "",
    viewCount: 0,
  });
  const [kegel, setKegel] = useState<KegelTimes[] | undefined>(undefined);
  const [quiz, setQuiz] = useState<Quizzes[] | undefined>(undefined);

  const [video, setVideo] = useState<{ videoUrl: string | undefined }>({
    videoUrl: "",
  });

  useEffect(() => {
    if (unAuthenticatedDayData) {
      const unAuthDayData = unAuthenticatedDayData[0].attributes;
      if (unAuthDayData) {
        setBlog({
          id: unAuthDayData.blog.data.id,

          title: unAuthDayData.blog.data.attributes.title,
          content: unAuthDayData.blog.data.attributes.content,
          viewCount: unAuthDayData.blog.data.attributes.viewCount,
        });
        setQuiz(unAuthDayData?.quizzes.data);

        setVideo({ videoUrl: unAuthDayData.video.data.attributes.VideoUrl });

        setKegel(unAuthDayData?.kegel.data.attributes.kegel_times.data);
      }
    }
  }, [unAuthenticatedDayData, unAuthDayId]);

  const DayCount = parseInt(unAuthDayId) || 0;

  if (isLoading) {
    return (
      <>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-200 p-4 rounded-md">
            <Skeleton active title={false} paragraph={{ rows: 5 }} />
          </div>

          {/* Content Box */}
          <div className="flex-1 bg-white p-20">
            <Skeleton
              active
              title={{ width: "60%" }}
              paragraph={{
                rows: 10,
                width: ["100%", "90%", "80%", "70%", "50%"],
              }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Modal
        title="Hurra you have finished another Day! Congratulations"
        open={isFinishModalOpen}
        onOk={handleOk}
        closable={false}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Image
          className="mx-auto"
          src={DayFinishImage}
          alt="Day Fininsh Congratulation image"
        />
      </Modal>
      {DayCount > 4 ? (
        <CompliteTask auth={false} daysCompleted={40} />
      ) : (
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
          paid={paid}
          daysLeft={0}
        />
      )}
    </>
  );
}

export default UnAuthTask;
