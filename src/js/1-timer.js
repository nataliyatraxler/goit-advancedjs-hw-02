flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            alert("Будь ласка, оберіть дату в майбутньому");
            document.getElementById("start-button").disabled = true;
        } else {
            document.getElementById("start-button").disabled = false;
        }
    }
});

let countdownInterval;

document.getElementById("start-button").addEventListener("click", function() {
    const inputField = document.getElementById("datetime-picker");
    inputField.disabled = true;  // Блокуємо інпут під час роботи таймера
    document.getElementById("start-button").disabled = true; // Блокуємо кнопку під час роботи таймера
    const endDate = new Date(inputField.value);

    clearInterval(countdownInterval);  // Зупинка попереднього таймера

    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const timeRemaining = endDate.getTime() - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            updateTimerDisplay(0, 0, 0, 0);
            alert("Таймер завершено!");
            inputField.disabled = false;  // Розблоковуємо інпут після завершення таймера
            document.getElementById("start-button").disabled = false; // Розблоковуємо кнопку після завершення
        } else {
            const { days, hours, minutes, seconds } = convertMs(timeRemaining);
            updateTimerDisplay(days, hours, minutes, seconds);
        }
    }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
