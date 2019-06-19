import axios from "axios";

const APIURL = "/api/todos";

export async function getTodos() {
  try {
    let res = await axios.get(APIURL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createTodo(val) {
  try {
    let res = await axios.post(APIURL, { name: val });
    console.log(APIURL);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeTodo(id) {
  const deleteURL = `${APIURL}/${id}`;
  let res = await axios.delete(deleteURL);
  console.log(` this is from API ====${res.data}`);
  console.log(res.data);
  return res.data;
}

export async function completeTodo(id) {
  const updateURL = `${APIURL}/${id}/update`;
  console.log(updateURL);
  let res = await axios.put(updateURL);
  return res.data;
}

export async function editTodo(id, val) {
  const editURL = `${APIURL}/${id}/edit`;
  console.log(editURL);
  let res = await axios.put(editURL, { name: val });
  return res.data;
}
