"use client";
import { axiosInstance } from "@/lib/utils";
import { useEffect } from "react";
import { Img } from "./components/Img";

export default function Home() {
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance.get("/login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Img></Img>
    </div>
  );
}
