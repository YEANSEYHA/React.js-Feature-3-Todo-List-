import React from 'react';
import CreateTask from '../modals/CreateTask';
import { useState, useEffect } from 'react';
import Card from './Card';



const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    // Change get todo from localstorage to from api
    useEffect(() => {

        fetch('http://localhost:5000/api/todos')
            .then(response => response.json())
            .then(json => setTaskList(json));
        console.log(taskList);
        console.log('i fire once');
        // let arr = localStorage.getItem("taskList");

        // if (arr) {
        //     let obj = JSON.parse(arr);
        //     setTaskList(obj);
        // }
    }, []);
    const deleteTask = (index) => {
        let tempList = taskList;
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const updateListArray = (obj, index) => {
        let tempList = taskList;
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };
    const toggle = () => {
        setModal(!modal);
    };
    const saveTask = (taskObj) => {
        let tempList = taskList;
        tempList.push(taskObj);
        setTaskList(tempList);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setModal(false);
    };
    return (
        <>
            <div className='header text-center'>
                <h3>Todo List</h3>
                <button className='btn btn-primary' onClick={() => setModal(true)}>Create Task</button>
            </div>
            <div className='task-container'>
                {taskList && taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>

    );
};

export default TodoList;