import Login from "./components/Login"; // Make sure path is
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
    return (
        <div>
            <Login />
            <TaskList />
            <TaskForm />
        </div>
    );
}

export default App;
