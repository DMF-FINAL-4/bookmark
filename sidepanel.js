console.log('sidepanel.js');


// IndexedDB에 저장할 수 있도록 데이터베이스와 객체 저장소를 설정하는 함수
function initializeDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('PageStorageDB', 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('pages')) {
          db.createObjectStore('pages', { keyPath: 'id', autoIncrement: true });
        }
      };
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
  
  // 현재 페이지의 정보를 IndexedDB에 저장하는 함수
  async function saveCurrentPage() {
    const db = await initializeDB();
    const transaction = db.transaction('pages', 'readwrite');
    const store = transaction.objectStore('pages');
  
    const pageData = {
      url: window.location.href,
      title: document.title,
      htmlContent: document.documentElement.outerHTML
    };
  
    store.add(pageData);
    transaction.oncomplete = () => {
      alert('페이지가 성공적으로 저장되었습니다.');
    };
    transaction.onerror = () => {
      alert('페이지 저장 중 오류가 발생했습니다.');
    };
  }
  
  // 버튼 클릭 이벤트 리스너 설정
  document.getElementById('save-page-button').addEventListener('click', saveCurrentPage);
  