const scheduleData = [
    { id: 1, title: "Йога", time: "08:00", maxParticipants: 10, enrolled: 7 },
    { id: 2, title: "Пилатес", time: "09:00", maxParticipants: 12, enrolled: 12 },
    { id: 3, title: "Бокс", time: "10:00", maxParticipants: 8, enrolled: 5 },
    { id: 4, title: "Зумба", time: "11:00", maxParticipants: 20, enrolled: 15 }
];


function renderSchedule() {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = ''; // Очистка содержимого перед перерисовкой

    scheduleData.forEach(session => {
        const isFull = session.enrolled >= session.maxParticipants;

        const sessionCard = document.createElement('div');
        sessionCard.className = 'col-md-4 mb-3';
        sessionCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${session.title}</h5>
                    <p class="card-text">Время: ${session.time}</p>
                    <p class="card-text">Максимум участников: ${session.maxParticipants}</p>
                    <p class="card-text">Записано: ${session.enrolled}</p>
                    <button class="btn btn-primary enroll-btn" data-id="${session.id}" ${isFull ? 'disabled' : ''}>
                        Записаться
                    </button>
                    <button class="btn btn-danger unenroll-btn" data-id="${session.id}">
                        Отменить запись
                    </button>
                </div>
            </div>
        `;

        scheduleContainer.appendChild(sessionCard);
    });

    attachEventListeners();
}

function attachEventListeners() {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    const unenrollButtons = document.querySelectorAll('.unenroll-btn');

    enrollButtons.forEach(button => {
        button.addEventListener('click', handleEnroll);
    });

    unenrollButtons.forEach(button => {
        button.addEventListener('click', handleUnenroll);
    });
}

function handleEnroll(event) {
    const sessionId = event.target.getAttribute('data-id');
    const session = scheduleData.find(s => s.id == sessionId);

    if (session && session.enrolled < session.maxParticipants) {
        session.enrolled++;
        renderSchedule(); // Перерисовка страницы
    }
}

function handleUnenroll(event) {
    const sessionId = event.target.getAttribute('data-id');
    const session = scheduleData.find(s => s.id == sessionId);

    if (session && session.enrolled > 0) {
        session.enrolled--;
        renderSchedule(); // Перерисовка страницы
    }
}

// Первоначальная отрисовка расписания
renderSchedule();