import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import GetAllStudents  from './components/GetAllStudents';
import Counter from './components/Counter';
import GetStudentById from './components/GetStudentById';
import UpdateStudentbyId from './components/UpdateStudentbyId';
import AddStudent from './components/AddStudent';

const router = createBrowserRouter([
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
    path: "/add",
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
