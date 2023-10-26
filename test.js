// Отримуємо посилання на зображення та кнопку
const image = document.getElementById("download-image");
const downloadButton = document.getElementById("download-button");

// Встановлюємо URL для завантаження
const imageUrl =
  "https://images.unsplash.com/photo-1696142990758-581061f2801d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDgyMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjk2NDV8&ixlib=rb-4.0.3&q=80&w=1080";

// Додаємо обробник події для кнопки "Завантажити"
downloadButton.addEventListener("click", function () {
  // Створюємо посилання для завантаження зображення
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "зображення.jpg"; // Назва для завантаженого файлу
  link.style.display = "none"; // Приховуємо посилання

  // Додаємо посилання на сторінку та симулюємо клік
  document.body.appendChild(link);
  link.click();

  // Видаляємо посилання
  document.body.removeChild(link);
});
