import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all the users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers",async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,{
        headers:{Authorization: `Bearer ${localStorage.getItem("userToken")}`}
    })
  return  response.data
})

