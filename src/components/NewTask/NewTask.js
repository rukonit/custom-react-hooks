
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useTasks from '../../hooks/useTasks';

const NewTask = (props) => {

  const {isLoading, error, sendRequests} = useTasks()

  const createTask =(taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);

  }

  const enterTaskHandler = async (taskText) => {
    
    
    sendRequests({
      url: 'https://react-task-back-default-rtdb.firebaseio.com/tasks.json',
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          }
        }, 
        createTask.bind(null, taskText));
  
   
      }

   

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
