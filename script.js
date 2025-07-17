document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('sentences-container');
    const searchInput = document.getElementById('search');
    const shuffleButton = document.getElementById('shuffle');
    
    // Initial display
    displaySentences(japaneseData);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm === '') {
            displaySentences(japaneseData);
            return;
        }
        
        const filteredData = japaneseData.filter(item => 
            item.japanese.toLowerCase().includes(searchTerm) ||
            item.romaji.toLowerCase().includes(searchTerm) ||
            item.english.toLowerCase().includes(searchTerm)
        );
        
        displaySentences(filteredData);
    });
    
    // Shuffle functionality
    shuffleButton.addEventListener('click', function() {
        const shuffled = [...japaneseData].sort(() => Math.random() - 0.5);
        displaySentences(shuffled);
    });
    
    function displaySentences(data) {
        container.innerHTML = '';
        
        data.forEach(item => {
            const row = document.createElement('div');
            row.className = 'sentence-row';
            
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
});
