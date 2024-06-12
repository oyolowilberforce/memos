document.addEventListener('DOMContentLoaded', () => {
    loadMemos();
});

function showMemoList(filter = 'all') {
    const memos = getMemos();
    const memosList = document.getElementById('memos');
    memosList.innerHTML = '';

    const filteredMemos = filter === 'all' ? memos : memos.filter(memo => memo.type === filter);

    filteredMemos.forEach(memo => {
        const li = document.createElement('li');
        li.innerText = `${memo.title} (${memo.type})`;
        li.onclick = () => showMemoDetail(memo.id);
        memosList.appendChild(li);
    });

    document.getElementById('memo-list-title').innerText = filter.charAt(0).toUpperCase() + filter.slice(1) + ' Memos';
    document.getElementById('memo-list').classList.remove('hidden');
    document.getElementById('memo-form').classList.add('hidden');
    document.getElementById('memo-detail').classList.add('hidden');
    document.getElementById('edit-memo-form').classList.add('hidden');
    document.getElementById('search-bar').classList.remove('hidden');
}

function showMemoForm() {
    document.getElementById('memo-list').classList.add('hidden');
    document.getElementById('memo-form').classList.remove('hidden');
    document.getElementById('memo-detail').classList.add('hidden');
    document.getElementById('edit-memo-form').classList.add('hidden');
    document.getElementById('search-bar').classList.add('hidden');
    document.getElementById('new-memo-form').reset();
}

function showMemoDetail(id) {
    const memos = getMemos();
    const memo = memos.find(m => m.id === id);
    document.getElementById('memo-content').innerHTML = `<h3>${memo.title}</h3><p>${memo.content}</p>`;
    document.getElementById('memo-list').classList.add('hidden');
    document.getElementById('memo-form').classList.add('hidden');
    document.getElementById('memo-detail').classList.remove('hidden');
    document.getElementById('edit-memo').setAttribute('data-id', memo.id);
    document.getElementById('delete-memo').setAttribute('data-id', memo.id);
    document.getElementById('search-bar').classList.add('hidden');
}

function showEditForm() {
    const id = document.getElementById('edit-memo').getAttribute('data-id');
    const memos = getMemos();
    const memo = memos.find(m => m.id === id);
    document.getElementById('edit-id').value = memo.id;
    document.getElementById('edit-title').value = memo.title;
    document.getElementById('edit-content').value = memo.content;
    document.getElementById('edit-type').value = memo.type;

    document.getElementById('memo-list').classList.add('hidden');
    document.getElementById('memo-form').classList.add('hidden');
    document.getElementById('memo-detail').classList.add('hidden');
    document.getElementById('edit-memo-form').classList.remove('hidden');
    document.getElementById('search-bar').classList.add('hidden');
}

function getMemos() {
    return JSON.parse(localStorage.getItem('memos')) || [];
}

function saveMemos(memos) {
    localStorage.setItem('memos', JSON.stringify(memos));
}

function loadMemos() {
    showMemoList('all');
}

function createMemo(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const type = document.getElementById('type').value;
    const memos = getMemos();
    const newMemo = {
        id: Date.now(),
        title,
        content,
        type
    };
    memos.push(newMemo);
    saveMemos(memos);
    showMemoList('all');
}

function updateMemo(event) {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;
    const type = document.getElementById('edit-type').value;
    const memos = getMemos();
    const memoIndex = memos.findIndex(m => m.id === parseInt(id));
    memos[memoIndex].title = title;
    memos[memoIndex].content = content;
    memos[memoIndex].type = type;
    saveMemos(memos);
    showMemoList('all');
}

function deleteMemo() {
    const id = document.getElementById('delete-memo').getAttribute('data-id');
    let memos = getMemos();
    memos = memos.filter(m => m.id !== parseInt(id));
    saveMemos(memos);
    showMemoList('all');
}

function searchMemos() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const memos = getMemos();
    const filteredMemos = memos.filter(memo => memo.title.toLowerCase().includes(query) || memo.content.toLowerCase().includes(query));
    const memosList = document.getElementById('memos');
    memosList.innerHTML = '';

    filteredMemos.forEach(memo => {
        const li = document.createElement('li');
        li.innerText = `${memo.title} (${memo.type})`;
        li.onclick = () => showMemoDetail(memo.id);
        memosList.appendChild(li);
    });

    document.getElementById('memo-list-title').innerText = `Search Results for "${query}"`;
    document.getElementById('memo-list').classList.remove('hidden');
    document.getElementById('memo-form').classList.add('hidden');
    document.getElementById('memo-detail').classList.add('hidden');
    document.getElementById('edit-memo-form').classList.add('hidden');
}
