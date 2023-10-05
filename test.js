document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("downloadButton");

  // URL зображення, яке ви хочете дозволити користувачу завантажити
  const imageUrl =
    "https://w.forfun.com/fetch/a9/a9b77c9d17fcd84d2a29e91fa6130c56.jpeg?h=900&r=0.5";

  // Додавання обробників подій
  downloadButton.addEventListener("click", function () {
    downloadImage(imageUrl);
  });

  // Функція для завантаження зображення
  function downloadImage(url) {
    // Створюємо посилання для завантаження
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg"; // Ім'я файлу для завантаження

    // Симулюємо подію кліку на посилання
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    });

    link.dispatchEvent(clickEvent);
  }
});
