document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();  // Зупиняємо стандартну поведінку форми

    // Отримуємо значення з форми та перетворюємо на число
    const delay = Number(document.querySelector('input[name="delay"]').value);
    const state = document.querySelector('input[name="state"]:checked').value;

    // Перевірка, чи є затримка валідним числом
    if (isNaN(delay) || delay <= 0) {
        alert("Будь ласка, введіть дійсну затримку в мілісекундах.");
        return;
    }
    

    // Створюємо проміс
    createPromise(delay, state)
        .then(message => {
            iziToast.success({
                title: 'Success',
                message: message,
                timeout: 5000,
            });
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: error,
                timeout: 5000,
            });
        });
});

// Функція для створення промісу
function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
}
