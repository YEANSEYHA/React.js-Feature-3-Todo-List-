import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../redux/slice/todo';


const EditTaskPopup = ({ modal, toggle, updateTask, taskObj, todoId }) => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    // const [todoId, setTodoId] = useState('');

    const handleChange = (e) => {

        const { name, value } = e.target;
        console.log(e.target);
        if (name === "taskName") {
            setTaskName(value);
        } else {
            setDescription(value);
        }


    };

    useEffect(() => {
        setTaskName(taskObj.title);
        setDescription(taskObj.description);
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {};
        tempObj['title'] = taskName;
        tempObj['description'] = description;
        tempObj['id'] = todoId;
        dispatch(updateTodo(tempObj, todoId));
        // axios.put(`http://localhost:5000/api/todos/${todoId}`, tempObj)
        //     .then((res) => window.location.replace('http://localhost:3000/'));
        // updateTask(tempObj);
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>

                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                </div>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;