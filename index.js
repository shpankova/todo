const root = document.getElementById('root');

function validateXhr(fileNumber) {
  if (!fileNumber) {
    throw new Error(`Incorrect fileNumber - ${fileNumber}`);
  }
}


function fetchJsonFile(path, callback) {
  const httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
              const data = JSON.parse(httpRequest.response);
              if (callback) {
                return callback(data, httpRequest.status);
              };
          }
      }
  };

  httpRequest.open('GET', path);
  httpRequest.send(); 
}

const btn = document.querySelector('.button')
btn.addEventListener('click', (event) => {
  event.preventDefault();

  let date = document.getElementById('date').value;
  let name = document.getElementById('name').value;
  let importanceLevel = document.getElementById('importanceLevel').value;
  let notes = document.getElementById('notes').value;
  let time = document.getElementById('time').value;
  let fileNumber = document.getElementById('fileNumber').value;

  writeJsonFile({ fileNumber, date, importanceLevel, name, notes, time })
})


function updateJsonFile({ fileNumber, date, importanceLevel, name, notes, time }) {
  validateXhr(fileNumber);
  
  const httpRequest = new XMLHttpRequest();

  const data = JSON.stringify({ fileNumber, date, importanceLevel, name, notes, time });

  httpRequest.open('PUT', '/data')
  httpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  httpRequest.send(data);
}

function writeJsonFile({ fileNumber, date, importanceLevel, name, notes, time }) {
  validateXhr(fileNumber);

  const httpRequest = new XMLHttpRequest();

  const data = JSON.stringify({ fileNumber, date, importanceLevel, name, notes, time });

  httpRequest.open('POST', '/data')
  httpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  httpRequest.send(data);
}

class EventInformation {
  constructor(date, importanceLevel, name, notes, time) {
    this.date = date;
    this.importanceLevel = importanceLevel;
    this.name = name;
    this.notes = notes;
    this.time = time;
  }
}

for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    fetchJsonFile(`./darina_data_${i}.json`, (data, ajaxStatus) => {
      const { date, time, name, importanceLevel, notes } = data;
      const eventInformation = new EventInformation(date, time, name, importanceLevel, notes);

      const div = document.createElement('div');
      div.classList.add('card');

      div.innerHTML = `
        <div class="card-time">${eventInformation.date}</div>
        <div class="card-time">${eventInformation.importanceLevel}</div>
        <div class="card-title">${eventInformation.notes}</div>
        <div class="card-title">${eventInformation.time}</div>
        <div class="card-title">${eventInformation.name}</div>
    
      `;

      const ajaxStatusDiv = document.createElement('div');
      ajaxStatusDiv.classList.add('status');
      ajaxStatusDiv.innerText = `AjaxStatus - ${ajaxStatus}`;
      
      root.appendChild(div);
      root.appendChild(ajaxStatusDiv); 
    });
  }, 1000 * i)
}
