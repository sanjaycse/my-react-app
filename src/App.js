import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import GetAllStudents  from './components/GetAllStudents';
import Counter from './components/Counter';
import GetStudentById from './components/GetStudentById';
import UpdateStudentbyId from './components/UpdateStudentbyId';
import AddStudent from './components/AddStudent';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <GetAllStudents />,
  },
  {
    path: "counter",
    element: <Counter />,
  },
  {
    path: "/student",
    element: <GetStudentById />,
  },
  {
    path: "/update",
    element: <UpdateStudentbyId />,
  },
  {
    path: "/signup",
    element: <AddStudent />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
