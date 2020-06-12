document.getElementById('submitBtn').addEventListener('click', (event) => {
  event.preventDefault();
  if (document.getElementById('todoInput').value.length > 0) {

    
    let todoElem = document.createElement('li');
    todoElem.textContent = document.getElementById('todoInput').value;
    document.getElementById('output').append(todoElem);
  }
});

document.getElementById('loginBtn').addEventListener('click', (event) => {
  event.preventDefault();
  if (document.getElementById('usernameInput').value.length > 0) {
    let username = document.getElementById('usernameInput').value;
    axios
      .get(`/api/users/${username}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
});
