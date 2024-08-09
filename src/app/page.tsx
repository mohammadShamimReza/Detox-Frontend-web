"use client";
import { getTokenFromCookie } from "@/lib/auth/token";
import { useGetUserInfoQuery } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { Skeleton } from "antd";
import React, { useEffect } from "react";
import UnAuthTask from "./myTasks/UnAuthTask";

const MyTasks: React.FC = () => {
  const {
    data: userData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();

  const authDayDataId = userData?.currentDay!;
  const userId = userData?.id!;
  const paid = userData?.paid;

  const userInfo = useAppSelector((store) => store.auth.userInfo);
  const userToken = useAppSelector((store) => store.auth.authToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchToken = () => {
      const tokenFromLocalStorage = getTokenFromCookie();
      if (tokenFromLocalStorage) {
        dispatch(storeUserInfo(userData));
        dispatch(storeAuthToken(tokenFromLocalStorage));
      }
    };

    fetchToken(); // Fetch the token on component mount
  }, []);

  return (
    <>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton style={{ marginTop: "40px" }} key={index} active />
        ))
      ) : userData === undefined &&
        authenticatedUserInfoDataError === true &&
        paid === undefined ? (
        // Unauthenticated user render
        <UnAuthTask paid={paid} />
      ) : paid === false ? (
        <UnAuthTask paid={paid} />
      ) : null}
    </>
  );
};

export default MyTasks;
