import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    const response = await fetch('http://localhost:5000/api/todos');
    return response.json();
});

export const deleteTodo = createAsyncThunk('deleteTodo', async (id) => {
    const response = await fetch('http://localhost:5000/api/todos/' + id, {
        method: 'DELETE'
    });
    // change it later to react-router
    window.location.replace('http://localhost:3000/');
    return response.json();
});

export const createTodo = createAsyncThunk('createTodo', async (data) => {
    console.log(data);
    const response = await axios.post('http://localhost:5000/api/todos/', data);
    window.location.replace('http://localhost:3000/');
    console.log(response);
    return response;
});

export const updateTodo = createAsyncThunk('editTodo', async (data) => {
    console.log(data);
    const response = await axios.put(`http://localhost:5000/api/todos/${data.id}`, data);
    window.location.replace('http://localhost:3000/');
    console.log(response);
    return response;
});




const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true;

        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true;
        });
        // Delete api
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
    }
});

export default todoSlice.reducer;