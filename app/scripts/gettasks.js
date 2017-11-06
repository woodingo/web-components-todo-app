const getTasks = function() {
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', 'Bearer b451182a162db9b1ef0ff710e1d60f06f3eb22e0');
  requestHeaders.append('X-Api-Factory-Application-Id', '59ff539df8a7ab6dcdf97892');
  fetch('http://api-factory.simbirsoft/api/db/tasks', { method: 'GET', headers: requestHeaders })
  .then(response => {
    return response.json();
  }).then(json => {
    document.querySelector('.list').taskList = json.data;
  })
}

const createTask = function(taskName) {
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', 'Bearer b451182a162db9b1ef0ff710e1d60f06f3eb22e0');
  requestHeaders.append('X-Api-Factory-Application-Id', '59ff539df8a7ab6dcdf97892');
  requestHeaders.append('Content-Type', 'application/json');

  fetch('http://api-factory.simbirsoft/api/db/tasks', { method: 'POST', headers: requestHeaders, body: JSON.stringify({ name: taskName}) })
  .then(response => {
    return response.json();
  }).then(json => {
    getTasks();
  })
}

const deleteTask = function(id) {
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', 'Bearer b451182a162db9b1ef0ff710e1d60f06f3eb22e0');
  requestHeaders.append('X-Api-Factory-Application-Id', '59ff539df8a7ab6dcdf97892');

  fetch(`http://api-factory.simbirsoft/api/db/tasks/${id}`, { method: 'DELETE', headers: requestHeaders })
  .then(response => {
    return response.json();
  }).then(json => {
    getTasks();
  })
}

getTasks();