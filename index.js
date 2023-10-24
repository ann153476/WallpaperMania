////////////////////////////////
const accessKey = "AK8wCt8zfUTOsgY5nETTZBQvlMp5KzaV3apx7zdmcOI";
const NumbPictHome = 18;
const count = 18;
////////////////////////////////
const menuBTN = document.querySelector(".nav__menu__btn");
const Xbtn = document.querySelector(".close__modal__btn");
const modal = document.querySelector("#modal");
///////////

menuBTN.addEventListener("click", () => {
  modal.style.transform = "translateX(0%)";
});
Xbtn.addEventListener("click", () => {
  modal.style.transform = "translateX(100%)";
});
///

const imagesBox = document.querySelector(".images__box");
for (let i = 0; i < NumbPictHome; i++) {
  imagesBox.insertAdjacentHTML(
    "afterbegin",
    '<div class="img__box"><svg class="img__box__svg"><use href="./img/symbol-defs.svg#icon-checkmark"></use></svg><img  class="img__home" /></div>'
  );
}

///
const imgBox = document.querySelectorAll(".img__box");
const imgHome = document.querySelectorAll(".img__home");
const topic = "people";

axios
  .get(
    `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`
    //`https://api.unsplash.com/topics/${topic}/photos?client_id=${accessKey}&per_page=${NumbPictHome}`
  )
  .then((response) => {
    const photosData = response.data;
    for (let i = 0; i < imgHome.length; i++) {
      imgHome[i].src = photosData[i].urls.regular;
      imgHome[i].alt = photosData[i].alt_description;
      //imgBox[i].id = photosData[i].id;
      imgBox[i].id = i;
    }
    // for (let i = 0; i < imgHome.length; i++) {
    //   imgHome[i].src = photosData.results[i].cover_photo.urls.regular;
    //   imgHome[i].alt = photosData.results[i].cover_photo.alt_description;
    // }
    // for (let i = 0; i < imgHome.length; i++) {
    //   imgHome[i].src = photosData[i].urls.small;
    //   //imgHome[i].alt = photosData[i].alt_description;
    // }
  })
  .catch((error) => {
    console.error(error);
  });
//

////////search////////////
const myInput = document.querySelector(".input__search");
const foundPhotoBox = document.querySelector(".found__photo__box");
const countFound = 10; // Кількість фотографій
function funcSearch(e) {
  let query = e.target.value;
  foundPhotoBox.innerHTML = ``;
  axios
    .get(
      `https://api.unsplash.com/search/collections?client_id=${accessKey}&per_page=${NumbPictHome}&query=${query}`
    )
    .then((response) => {
      const photosData = response.data;
      for (let i = 0; i < 9; i++) {
        console.log(photosData.results[1], "eeee");
        foundPhotoBox.insertAdjacentHTML(
          "afterbegin",
          `<img src="${photosData.results[i].cover_photo.urls.regular}"/>`
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });

  //const searchTerm = e.target.value;
}

myInput.addEventListener("input", funcSearch);

/////////select///////////
function sendImageSrcToBackend(url) {
  const dataToSend = {
    url: url,
  };

  fetch("https://6537843dbb226bb85dd35975.mockapi.io/images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Дані було успішно відправлено на бекенд.");
      } else {
        console.error("Помилка під час відправлення даних на бекенд.");
      }
    })
    .catch((error) => {
      console.error("Помилка під час відправлення даних:", error);
    });
}

////////////////////////
const imgBoxSvg = document.querySelectorAll(".img__box__svg");

let saveSelectImg = [];

function funcSelect(e) {
  const imageSrc = e.target.closest(".img__box").querySelector("img").src;

  const index = saveSelectImg.indexOf(imageSrc);

  if (index !== -1) {
    //deleteImageSrcToBackend(imageSrc); //видалення картинки з бекєнду
    // Якщо посилання знайдено в масиві, видаляємо його
    saveSelectImg.splice(index, 1);
    imgBoxSvg[e.target.id].classList.remove("select__img");
  } else {
    sendImageSrcToBackend(imageSrc); //відправлення картинки на бекенд
    // Якщо посилання не знайдено в масиві, додаємо його
    saveSelectImg.push(imageSrc);
    imgBoxSvg[e.target.id].classList.add("select__img");
  }

  console.log(saveSelectImg);
}

for (let i = 0; i < imgBox.length; i++) {
  imgBox[i].addEventListener("click", funcSelect);
}
///////////download////////////

//////////////////
document.addEventListener("DOMContentLoaded", () => {
  const uploadBTN = document.querySelector(".upload__BTN");
  uploadBTN.addEventListener("click", () => {
    fetch("https://6537843dbb226bb85dd35975.mockapi.io/images")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Помилка під час отримання зображень з бекенду.");
        }
      })
      .then((data) => {
        data.forEach((imageData, index) => {
          // Отримайте URL зображення з об'єкта даних
          const imageUrl = imageData.url;

          // Виконайте запит, щоб завантажити зображення
          fetch(imageUrl)
            .then((imageResponse) => imageResponse.blob())
            .then((imageBlob) => {
              // Створіть об'єкт URL для зображення
              const imageURL = URL.createObjectURL(imageBlob);

              // Створіть посилання для завантаження зображення
              const a = document.createElement("a");
              a.href = imageURL;
              a.download = `image${index + 1}.jpg`; // Встановіть ім'я файлу за потребою
              a.textContent = `Завантажити зображення ${index + 1}`;
              document.body.appendChild(a);
              console.log(imageURL, "hhhhhhhhhh");
            })
            .catch((error) => {
              console.error("Помилка під час завантаження зображення:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Помилка під час отримання списку зображень:", error);
      });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////

// // Вибираємо кнопку за її класом
// const uploadButton = document.querySelector(".header__BTN");

// // Створюємо пустий список для збереження обраних картинок
// const selectedImages = [];

// // Додаємо обробник події на клік по кнопці
// uploadButton.addEventListener("click", () => {
//   // Тут ви можете додати код для додавання обраної картинки до списку
//   // Наприклад, можливо, ви маєте посилання на обрану картинку, яке ви хочете додати до списку
//   const selectedImageURL = "шлях_до_обраної_картинки.jpg";

//   // Додаємо посилання на обрану картинку до списку
//   selectedImages.push(selectedImageURL);

//   // Ви можете також оновити інтерфейс для відображення обраних картинок
//   // Наприклад, створити мініатюри або список обраних картинок на вашому сайті

//   // При необхідності оновіть вміст сторінки з обраними картинками
//   // Наприклад, вставте посилання на картинки в DOM елемент
//   updateSelectedImagesUI();
// });

// // Функція для оновлення інтерфейсу з обраними картинками
// function updateSelectedImagesUI() {
//   // Отримайте DOM-елемент, де ви хочете відображати обрані картинки
//   const selectedImagesContainer = document.querySelector(
//     ".selected-images-container"
//   );

//   // Очистіть контейнер перед оновленням
//   selectedImagesContainer.innerHTML = "";

//   // Пройдіться по списку обраних картинок і відобразіть їх у контейнері
//   selectedImages.forEach((imageURL) => {
//     const imageElement = document.createElement("img");
//     imageElement.src = imageURL;
//     selectedImagesContainer.appendChild(imageElement);
//   });
// }
