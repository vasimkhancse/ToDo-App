import { useState,useEffect } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import {CiEdit} from 'react-icons/ci'
import axios from 'axios';

import './App.css'

function App() {
  const url='http://127.0.0.1:8000/'
  const [isCompleteScreen, setisCompleteScreen] = useState(false)
  const [newTitle, setnewTitle] = useState('')
  const [newDescription, setnewDescription] = useState('')
  const [todo,setTodo]=useState([])
  const [loading,setLoading]=useState(false)
  const [currentEdit,setcurrentEdit]=useState('')
  const [currentEditedItem,setcurrentEditedItem]=useState("")
  const [updateTitle, setupdateTitle] = useState('')
  const [updateDescription, setupdateDescription] = useState('')
  const [completeTodo,setcompleteTodo]=useState([])

  useEffect(() => {
    axios.get(url+'show_todos')
      .then(response => {

        const filteredData = response.data.filter(value => value.status === "todo");
        setTodo(filteredData);

        const completeData = response.data.filter(value => value.status === "completed");
        setcompleteTodo(completeData);
        setLoading(false)
        
      })
      .catch(error => {
        console.log(error)
      });
  }, [loading]);

  const addItem=()=>{
    axios.post(url+'add_todo', {
      title: newTitle,
      description: newDescription,
      status:'todo'
    })
    .then(function (response) {
      setLoading(true)
      setnewTitle(''); 
      setnewDescription(''); 
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const deleteItem = (id) => {
    axios.delete(url + `delete_todo/${id}`)
      .then(function (response) {
        console.log(response);
        setTodo(todo.filter(todo => todo.id !== id));
        setLoading(true)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const updateItem=(id,status) => {
    axios.put(url + `update_todo/${id}`,
    {
      title: updateTitle,
      description: updateDescription,
      status:status
    }
    )
      .then(function (response) {
        setcurrentEdit('')
        setLoading(true)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const updateStatus=(id) => {
    axios.put(url + `update_todo/${id}`,
    {
      status:'completed'
    }
    )
      .then(function (response) {
        setcurrentEdit('')
        setLoading(true)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  return (
    <>
      <div className="App"> 
        <h1>My Todos</h1>
        <div className="todo_wrapper">
          <div className="todo_input">
            <div className="todo-input-item">
              <label>Title</label>
              <input type='text'   onChange={(e)=>{
                setnewTitle(e.target.value)
              }} value={newTitle} placeholder="What's the task Title?"/>
            </div>
            <div className="todo-input-item">
              <label>Description</label>
              <input type='text'  onChange={(e)=>{
                setnewDescription(e.target.value)
              }} value={newDescription} placeholder="What's the task Description?"/>
            </div>
            <div className="todo-input-item">
             <button className='primary_btn' onClick={addItem}>Add</button>
            </div>
          </div>
          <div className="btn-area">
          <button 
          className={`secondary_btn ${isCompleteScreen === false ? 'active' : ''}`} 
          onClick={() => setisCompleteScreen(false)}>
          Todo
          </button>
          <button 
          className={`secondary_btn ${isCompleteScreen === true ? 'active' : ''}`}
          onClick={() =>setisCompleteScreen(true)}>
            Completed</button>
          </div>
          <div className="todo-list">

          {
           isCompleteScreen ?(
              completeTodo.map((value,index)=>{
                
                return(
                  <div className='todo-list-item' key={index}>                
              <div >
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <p>the task has been completed</p>
              </div>
                </div>
                )})

            
            ):(
            
            todo.map((value,index)=>{
              if (currentEdit===index){
                return(
                <div className='edit_wrapper' key={index}> 
                <input  value={updateTitle} type='text'   onChange={(e)=>{
                setupdateTitle(e.target.value)
              }} placeholder="Updated Title?"/>
                <textarea value={updateDescription}  onChange={(e)=>{
                setupdateDescription(e.target.value)
              }} placeholder="Updated Description?"/>

            <button className='primary_btn' onClick={()=>updateItem(currentEditedItem.id,currentEditedItem.status)}>Update</button>

                </div>
                )

              }
              else{
              return(
                <div className='todo-list-item' key={index}>                
            <div >
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
            <div > 
            <AiOutlineDelete className='icon' onClick={()=>deleteItem(value.id)}/>
            <CiEdit className='icon' onClick={()=>{
              setcurrentEdit(index);
              setcurrentEditedItem(value);
              setupdateTitle(value.title);
              setupdateDescription(value.description);
            }
              }/>
            <BsCheckLg className='check_icon' onClick={()=>updateStatus(value.id)}/>
              </div>
              </div>
              )}
            })
          )}
          </div>

      </div>
      </div>
    </>
  )
}

export default App
