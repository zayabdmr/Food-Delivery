"use client";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8000", {
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

  return <div>Home Page</div>;
}
