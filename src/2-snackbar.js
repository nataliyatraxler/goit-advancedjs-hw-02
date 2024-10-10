document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();  // Зупиняємо стандартну поведінку форми

    // Отримуємо дані з форми
    const delay = document.querySelector('input[name="delay"]').value;
    const state = document.querySelector('input[name="state"]:checked').value;

    // Створюємо проміс
    createPromise(Number(delay), state)
        .then(message => {
            // Використовуємо iziToast для показу успішного повідомлення
            iziToast.success({
                title: 'Success',
                message: message,
                timeout: 5000,
            });
        })
        .catch(error => {
            // Використовуємо iziToast для показу помилки
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
