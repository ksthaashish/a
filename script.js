document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('sentences-container');
    const searchInput = document.getElementById('search');
    const shuffleBtn = document.getElementById('shuffle');
    const toggleRomajiBtn = document.getElementById('toggle-romaji');
    const toggleEnglishBtn = document.getElementById('toggle-english');
    
    // Modal elements
    const modal = document.getElementById('kanji-modal');
    const zoomedKanji = document.getElementById('zoomed-kanji');
    const zoomedRomaji = document.getElementById('zoomed-romaji');
    const zoomedEnglish = document.getElementById('zoomed-english');
    const closeBtn = document.querySelector('.close');
    
    let currentData = [...japaneseData];
    
    function renderSentences(data) {
        container.innerHTML = '';
        data.forEach((item, index) => {
            const japaneseCell = document.createElement('div');
            japaneseCell.className = 'sentence-cell japanese-cell';
            japaneseCell.textContent = item.japanese;
            japaneseCell.dataset.index = index; // Store index for reference
            
            const romajiCell = document.createElement('div');
            romajiCell.className = 'sentence-cell romaji-cell';
            romajiCell.textContent = item.romaji;
            
            const englishCell = document.createElement('div');
            englishCell.className = 'sentence-cell english-cell';
            englishCell.textContent = item.english;
            
            container.appendChild(japaneseCell);
            container.appendChild(romajiCell);
            container.appendChild(englishCell);
            
            // Add click event to Japanese cell
            japaneseCell.addEventListener('click', function() {
                const idx = this.dataset.index;
                zoomedKanji.textContent = currentData[idx].japanese;
                zoomedRomaji.textContent = currentData[idx].romaji;
                zoomedEnglish.textContent = currentData[idx].english;
                modal.style.display = 'block';
            });
        });
    }
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
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
