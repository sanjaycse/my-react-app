import Axios from "axios";


const authToken = localStorage.getItem("authToken");
const headers = { 
    'Authorization': `Bearer ${authToken}`
};

const getAllStudents = () => {
    return Axios.get("http://localhost:3000/api/student", undefined);
};


const getStudentById = (id) => {
    return Axios.get("http://localhost:3000/api/student/" + id, undefined, undefined);
};

const deleteStudentbyId = (id) => {
    return Axios.delete("http://localhost:3000/api/student/" + id, undefined, undefined);
};

const updateStudentbyId = (id, data) => {
    return Axios.put("http://localhost:3000/api/student/" + id, data, { headers });
};

const addStudent = (data) => {
    return Axios.post("http://localhost:3000/api/student/", data, undefined);
};

const login = (data) => {
    return Axios.post("http://localhost:3000/api/student/login", data, undefined);
};

const getAllCategories = () => {
    return Axios.get("http://localhost:3000/api/category", undefined, undefined);
};


// const getTasksListVendor = (data, lid) => {
//     return AxiosOrders.get(
//       "/api/VendorDashboardControllers/order/TaskList/" + lid + "?search=" + JSON.stringify(data),
//       undefined,
//       undefined
//     );
// };


export default {
    getAllStudents,
    getStudentById,
    deleteStudentbyId,
    updateStudentbyId,
    getAllCategories,
    addStudent,
    login
};