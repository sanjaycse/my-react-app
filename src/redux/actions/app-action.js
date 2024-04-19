import API from "../api/app-api";


export function getAllStudents() {
    return async function (dispatch, getState) {
        try {
            let resp = await API.getAllStudents();
            return resp;
        } catch (e) {
            return { error: true };
        }
    };
}


export function getStudentById(id) {
    return async function (dispatch, getState) {
        try {
            let resp = await API.getStudentById(id);
            return resp;
        } catch (e) {
            return { error: true };
        }
    };
}


export function deleteStudentbyId(id) {
    return async function (dispatch, getState) {
        try {
            let resp = await API.deleteStudentbyId(id);
            return resp;
        } catch (e) {
            return { error: true };
        }
    };
}

export function updateStudentbyId(id, data) {
    return async function (dispatch, getState) {
        try {
            let resp = await API.updateStudentbyId(id, data);
            return resp;
        } catch (e) {
            return { error: true };
        }
    };
}

export function addStudent(data) {
    return async function (dispatch, getState) {
        try {
            let resp = await API.addStudent(data);
            return resp;
        } catch (e) {
            return { error: true };
        }
    };
}

export function login(data) {
    return async function (dispatch, getState) {
        try {
            let resp = await API.login(data);
            return resp;
        } catch (e) {
            return { error: true };
        }
    };
}

export function getAllCategories() {
    return async function (dispatch, getState) {
        try {
            let resp = await API.getAllCategories();
            return resp;
        } catch (e) {
            return { error: true };
        }
    };
}