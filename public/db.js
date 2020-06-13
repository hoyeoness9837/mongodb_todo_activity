//만약 인터넷이 끊겼을때에, 사용자가 서버로보낸 데이터를 백업해놓았다가 다시 인터넷이 연결될때 꺼내서 서버로 보내준다. 또는 다른
//함수들이 뒤에서 계속적으로 돌아갈수 있도록해준다.

let db;

const request = indexedDB.open('list', 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;

  db.createObjectStore('pending', {
    autoIncrement: true,
  });
};

//인터넷이 연결됬을때 계속 인덱스에 백업하지않도록하여 데이터가 두배로 불어나지않게함
request.onsuccess = (event) => {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = (event) => {
  console.log(event.target.errorCode);
};

const saveItem = (item) => {
  const transaction = db.transaction(['pending'], 'readwrite');
  const store = transaction.objectStore('pending');
  store.add(item);
};

const checkDatabase = () => {
  const transaction = db.transaction(['pending'], 'readwrite');
  const store = transaction.objectStore('pending');
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    if (getAll.result.length > 0) {
      axios.post('/api/items', getAll.result).then(() => {
        const transaction = db.transaction(['pending'], 'readwrite');
        const store = transaction.objectStore('pending');
        store.clear();
      });
    }
  };
};

window.addEventListener('online', checkDatabase);
