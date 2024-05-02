import AddStudent from "../components/AddStudent";
import GetAllStudents from "../components/GetAllStudents";
import GetStudentById from "../components/GetStudentById";
import Login from "../components/Login";
import UpdateStudentbyId from "../components/UpdateStudentbyId";

export default {
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
        path: "/signup",
        component: AddStudent,
    }
  ],
  private: [
    {
      path: "/",
      component: GetAllStudents,
    },
    {
        path: "/student",
        component: GetStudentById,
    },
    {
        path: "/update",
        component: UpdateStudentbyId
    }
  ]
};
