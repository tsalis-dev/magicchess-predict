// Variabel global untuk menyimpan state permainan
let allPlayers = [];
let otherPlayers = [];
let myName = '';
let tumpuan1 = '';
let tumpuan2 = '';
let myOpponentHistory = []; // Variabel BARU untuk menyimpan riwayat lawan

// Cache elemen DOM yang sering digunakan
const ui = {
    statusUser: document.getElementById('status-user'),
    statusT1: document.getElementById('status-t1'),
    statusT2: document.getElementById('status-t2'),
    statusPhase: document.getElementById('status-phase')
};

function showCard(cardId) {
    document.querySelectorAll('#main-content .card').forEach(card => {
        card.classList.add('hidden');
    });
    if (cardId) {
        document.getElementById(cardId).classList.remove('hidden');
    }
}

function populateSelect(elementId, playerList) {
    const select = document.getElementById(elementId);
    select.innerHTML = '';
    playerList.forEach(player => {
        const option = document.createElement('option');
        option.value = player;
        option.textContent = player;
        select.appendChild(option);
    });
}

function setupGame() {
    const myNameInput = document.getElementById('my-name').value.trim();
    const otherPlayersInput = document.getElementById('other-players').value;
    const otherPlayersArray = otherPlayersInput.split(',').map(name => name.trim()).filter(Boolean);

    if (!myNameInput || otherPlayersArray.length !== 7) {
        alert('Harap masukkan nama Anda dan 7 nama pemain lain dengan benar.');
        return;
    }

    myName = myNameInput;
    otherPlayers = otherPlayersArray;
    allPlayers = [myName, ...otherPlayers];
    myOpponentHistory = []; // Reset riwayat

    ui.statusUser.textContent = myName;
    ui.statusPhase.textContent = 'Input Match 1';

    populateSelect('match1-opponent', otherPlayers);
    showCard('match-1-container');
}

function recordMatch1() {
    tumpuan1 = document.getElementById('match1-opponent').value;
    myOpponentHistory.push(tumpuan1); // Catat lawan Match 1
    ui.statusT1.textContent = tumpuan1;
    ui.statusPhase.textContent = 'Input Match 2';

    const remainingOpponents = otherPlayers.filter(p => p !== tumpuan1);
    populateSelect('match2-opponent', remainingOpponents);
    document.getElementById('t1-name-2').textContent = tumpuan1;
    populateSelect('match2-t1-opponent', remainingOpponents.filter(p => p !== tumpuan1));
    
    showCard('match-2-container');
}

function recordMatch2() {
    tumpuan2 = document.getElementById('match2-opponent').value;
    const t1_opponent_in_m2 = document.getElementById('match2-t1-opponent').value;
    myOpponentHistory.push(tumpuan2); // Catat lawan Match 2
    myOpponentHistory.push(t1_opponent_in_m2); // Catat lawan Match 3 (berdasarkan prediksi)
    ui.statusT2.textContent = tumpuan2;
    ui.statusPhase.textContent = 'Prediksi Match 3';

    document.getElementById('prediction-3-text').innerHTML = `Lawan Anda berikutnya adalah: <strong>${t1_opponent_in_m2}</strong>`;
    showCard('prediction-3-card');
}

function showMatch4Input() {
    ui.statusPhase.textContent = 'Input Match 4';
    document.getElementById('t1-name-4').textContent = tumpuan1;
    populateSelect('match4-opponent', otherPlayers);
    populateSelect('match4-t1-opponent', otherPlayers.filter(p => p !== tumpuan1));
    showCard('match-4-container');
}

function recordMatch4() {
    const myOpponentInM4 = document.getElementById('match4-opponent').value;
    const t1_opponent_in_m4 = document.getElementById('match4-t1-opponent').value;
    myOpponentHistory.push(myOpponentInM4); // Catat lawan Match 4
    myOpponentHistory.push(t1_opponent_in_m4); // Catat lawan Match 5 (berdasarkan prediksi)
    ui.statusPhase.textContent = 'Prediksi Match 5';

    document.getElementById('prediction-5-text').innerHTML = `Lawan Anda berikutnya adalah: <strong>${t1_opponent_in_m4}</strong>`;
    showCard('prediction-5-card');
}

function showMatch5Input() {
    ui.statusPhase.textContent = 'Input Match 5';
    document.getElementById('t2-name-5').textContent = tumpuan2;
    populateSelect('match5-t2-opponent', otherPlayers.filter(p => p !== tumpuan2));
    showCard('match-5-container');
}

function recordMatch5() {
    const t2_opponent_in_m5 = document.getElementById('match5-t2-opponent').value;
    myOpponentHistory.push(t2_opponent_in_m5); // Catat lawan Match 6 (berdasarkan prediksi)
    ui.statusPhase.textContent = 'Prediksi Match 6';

    document.getElementById('prediction-6-text').innerHTML = `Lawan Anda berikutnya adalah: <strong>${t2_opponent_in_m5}</strong>`;
    showCard('prediction-6-card');
}

function showMatch6Input() {
    ui.statusPhase.textContent = 'Input Match 6';
    document.getElementById('t1-name-6').textContent = tumpuan1;
    populateSelect('match6-t1-opponent', otherPlayers.filter(p => p !== tumpuan1));
    showCard('match-6-container');
}

function recordMatch6() {
    const t1_opponent_in_m6 = document.getElementById('match6-t1-opponent').value;
    myOpponentHistory.push(t1_opponent_in_m6); // Catat lawan Match 7 (berdasarkan prediksi)
    ui.statusPhase.textContent = 'Prediksi Match 7';

    document.getElementById('prediction-7-text').innerHTML = `Lawan Anda berikutnya adalah: <strong>${t1_opponent_in_m6}</strong>`;
    showCard('prediction-7-card');
}

function showSummary() {
    ui.statusPhase.textContent = 'Selesai';
    const listElement = document.getElementById('match-history-list');
    listElement.innerHTML = ''; // Kosongkan daftar sebelumnya

    if (myOpponentHistory.length === 7) {
        myOpponentHistory.forEach((opponent, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `Match ${index + 1}: Melawan <strong>${opponent}</strong>`;
            listElement.appendChild(listItem);
        });
    } else {
        listElement.innerHTML = '<li>Data riwayat pertandingan tidak lengkap.</li>';
    }

    showCard('summary-card');
}

function resetGame() {
    // Reset semua variabel
    allPlayers = []; otherPlayers = []; myName = ''; tumpuan1 = ''; tumpuan2 = ''; myOpponentHistory = [];
    
    // Reset tampilan
    ui.statusUser.textContent = 'Belum diatur';
    ui.statusT1.textContent = '-';
    ui.statusT2.textContent = '-';
    ui.statusPhase.textContent = 'Setup';
    document.getElementById('my-name').value = '';
    document.getElementById('other-players').value = '';
    
    showCard('setup-container');
}

// In