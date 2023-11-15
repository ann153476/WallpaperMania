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
    '<div class="img__box forsave"><svg class="img__box__svg"><use href="./img/symbol-defs.svg#icon-checkmark"></use></svg><img  class="img__home" /></div>'
  );
}

///
const imgBox = document.querySelectorAll(".img__box");
const imgHome = document.querySelectorAll(".img__home");
const topic = "people";

axios
  .get(
    `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`
  )
  .then((response) => {
    const photosData = response.data;
    for (let i = 0; i < imgHome.length; i++) {
      imgHome[i].style.boxShadow = `0 0 2em 1em  ${photosData[i].color}`;
      imgHome[i].id = photosData[i].id;
      imgHome[i].src = photosData[i].urls.regular;
      imgHome[i].alt = photosData[i].alt_description;
      imgHome[i].setAttribute(
        "data-url",
        photosData[i].links.download + "&force=true"
      );
      //console.log(photosData[i].links.download + "&force=true");
      ////////////////////////////////////////////
      ///////////////////////////////////////////
      ///////////////////&force=true////////////////////////
      /////////////////////////////////////////////
      //imgBox[i].id = photosData[i].id;
      imgBox[i].id = i;
    }
  })
  .catch((error) => {
    console.error(error);
  });
//

////////search////////////
const myInput = document.querySelector(".input__search");
const foundPhotoBox = document.querySelector(".found__photo__box");
const paginationBtnBox = document.querySelector(".pagination__btn__box");
const countPerPage = 9; // Кількість фотографій на сторінці
let currentPage = 1; // Поточна сторінка
let totalPhotos = 0; // Загальна кількість фотографій

function funcSearch(e) {
  let query = e.target.value;
  if (query) {
    paginationBtnBox.innerHTML = ""; // Очистити кнопки пагінації
    loadPage(1, query); // Завантажити першу сторінку
  } else {
    paginationBtnBox.innerHTML = "";
  }
}

// Завантажити сторінку за вказаним номером
function loadPage(page, query) {
  // Очистити вміст контейнера з фотографіями
  foundPhotoBox.innerHTML = "";
  //https://unsplash.com/photos/PAGBeJrLiDA/download?ixid=M3w1MDgyMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDAwNTQyMTF8&force=true
  //https://unsplash.com/photos/uHHjVwJs9as/download?ixid=M3w1MDgyMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDAwNTQyMTF8&force=true
  // Зробити запит до API Unsplash з використанням пагінації
  axios
    .get(
      `https://api.unsplash.com/search/collections?client_id=${accessKey}&per_page=${countPerPage}&page=${page}&query=${query}`
    )
    .then((response) => {
      const photosData = response.data;
      totalPhotos = photosData.total; // Отримати загальну кількість фотографій

      for (let i = 0; i < photosData.results.length; i++) {
        foundPhotoBox.insertAdjacentHTML(
          "beforeend",
          `<div style="border: 0.3vw solid ${
            photosData.results[i].cover_photo.color
          }" class="search__img__box forsave"><svg class="img__box__svg"><use href="./img/symbol-defs.svg#icon-checkmark"></use></svg><img id="${
            photosData.results[i].id
          }" class="forsave" data-url="${
            photosData.results[i].cover_photo.links.download +
            "?ixid=M3w1MDgyMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDAwNTQyMTF8&force=true"
          }" src="${photosData.results[i].cover_photo.urls.regular}"/></div>`
        );
      }
      // Оновити кнопки пагінації
      updatePaginationButtons();
      // Додати слухачів на кожен елемент .search__img__box
      const searchImgBox = document.querySelectorAll(".search__img__box");
      const searchImgBoxSVG = document.querySelectorAll(".img__box__svg");

      searchImgBox.forEach((box, index) => {
        box.addEventListener("click", (e) => {
          saveSelectImg.push(e.target.dataset.url);
          console.log(e.target.dataset.url, "hvhvhjvjyv");
          searchImgBoxSVG[index].classList.toggle("select__img");
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////
}

// Оновити кнопки пагінації
function updatePaginationButtons() {
  paginationBtnBox.innerHTML = ""; // Очистити кнопки пагінації

  // Додати кнопку "Previous Page", якщо поточна сторінка більше 1
  if (currentPage > 1) {
    paginationBtnBox.innerHTML +=
      '<button class="prev__page__btn">Previous Page</button>';
  }

  // Додати кнопку "Next Page", якщо є ще фотографії для завантаження
  if (totalPhotos > currentPage * countPerPage) {
    paginationBtnBox.innerHTML +=
      '<button class="next__page__btn">Next Page</button>';
  }
}

// Обробник кнопки "Next Page"
paginationBtnBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("next__page__btn")) {
    currentPage++; // Збільшити номер сторінки
    loadPage(currentPage, myInput.value);
  } else if (
    e.target.classList.contains("prev__page__btn") &&
    currentPage > 1
  ) {
    currentPage--; // Зменшити номер сторінки
    loadPage(currentPage, myInput.value);
  }
});

myInput.addEventListener("input", funcSearch);

/////////select///////////
function sendimageUrlToBackend(url, id) {
  const dataToSend = {
    url: url,
    findid: id,
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
  const imageUrl = e.target.closest(".forsave").querySelector("img")
    .dataset.url;
  //const imageId = e.target.closest(".forsave").querySelector("img").id;
  const index = saveSelectImg.indexOf(imageUrl);

  if (index !== -1) {
    saveSelectImg.splice(index, 1);
    imgBoxSvg[e.target.id].classList.remove("select__img");
  } else {
    //sendimageUrlToBackend(imageUrl, imageId); //відправлення картинки на бекенд
    // Якщо посилання не знайдено в масиві, додаємо його
    saveSelectImg.push(imageUrl);
    imgBoxSvg[e.target.id].classList.add("select__img");
  }
}

for (let i = 0; i < imgBox.length; i++) {
  imgBox[i].addEventListener("click", funcSelect);
}

///////////download////////////
const uploadBTN = document.querySelector(".upload__BTN");
uploadBTN.addEventListener("click", () => {
  for (let i = 0; i < saveSelectImg.length; i++) {
    let link = document.createElement("a");
    link.href = saveSelectImg[i];
    link.target = "_blank"; // Відкрити посилання в новій вкладці
    link.download = "img_" + (i + 1) + ".jpg"; // Ім'я файлу для завантаження
    link.style.display = "none"; // Приховати посилання
    document.body.appendChild(link);
    link.click(); // Симулювати клік на посиланні для скачування
    document.body.removeChild(link); // Видалити посилання після скачування
  }
  saveSelectImg = [];
  console.log(saveSelectImg, "<<<<saveSelectImg");
});
////////////////select ang save img search ///////////////////////
