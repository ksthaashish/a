document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('sentences-container');
    const searchInput = document.getElementById('search');
    const shuffleBtn = document.getElementById('shuffle');
    const toggleRomajiBtn = document.getElementById('toggle-romaji');
    const toggleEnglishBtn = document.getElementById('toggle-english');
    
    let currentData = [...japaneseData];
    
    function renderSentences(data) {
        container.innerHTML = '';
        data.forEach(item => {
            const japaneseCell = document.createElement('div');
            japaneseCell.className = 'sentence-cell japanese-cell';
            japaneseCell.textContent = item.japanese;
            
            const romajiCell = document.createElement('div');
            romajiCell.className = 'sentence-cell romaji-cell';
            romajiCell.textContent = item.romaji;
            
            const englishCell = document.createElement('div');
            englishCell.className = 'sentence-cell english-cell';
            englishCell.textContent = item.english;
            
            container.appendChild(japaneseCell);
            container.appendChild(romajiCell);
            container.appendChild(englishCell);
        });
    }
    
    // Initial render
    renderSentences(currentData);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        if (!term) {
            currentData = [...japaneseData];
        } else {
            currentData = japaneseData.filter(item => 
                item.japanese.toLowerCase().includes(term) ||
                item.romaji.toLowerCase().includes(term) ||
                item.english.toLowerCase().includes(term)
            );
        }
        renderSentences(currentData);
    });
    
    // Shuffle functionality
    shuffleBtn.addEventListener('click', function() {
        currentData = [...currentData].sort(() => Math.random() - 0.5);
        renderSentences(currentData);
    });
    
    // Toggle Romaji
    toggleRomajiBtn.addEventListener('click', function() {
        document.body.classList.toggle('hide-romaji');
        this.textContent = document.body.classList.contains('hide-romaji') 
            ? 'Show Romaji' 
            : 'Hide Romaji';
    });
    
    // Toggle English
    toggleEnglishBtn.addEventListener('click', function() {
        document.body.classList.toggle('hide-english');
        this.textContent = document.body.classList.contains('hide-english') 
            ? 'Show English' 
            : 'Hide English';
    });
});
