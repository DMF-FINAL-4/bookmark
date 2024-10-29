async function saveCurrentPage() {
    console.log('Initializing database...');
    const db = await initializeDB();
    console.log('Database initialized:', db);
  
    const transaction = db.transaction('pages', 'readwrite');
    const store = transaction.objectStore('pages');
  
    const pageData = {
      url: window.location.href,
      title: document.title,
      htmlContent: document.documentElement.outerHTML
    };
  
    console.log('Adding page data to store:', pageData);
    store.add(pageData);
  
    transaction.oncomplete = () => {
      console.log('Transaction complete');
      alert('페이지가 성공적으로 저장되었습니다.');
    };
    transaction.onerror = () => {
      console.error('Transaction error', transaction.error);
      alert('페이지 저장 중 오류가 발생했습니다.');
    };
  }
  