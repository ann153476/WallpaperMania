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
      imgHome[i].style.boxShadow = `0 0 10px 5px  ${photosData[i].color}`;
      imgHome[i].id = photosData[i].id;
      imgHome[i].src = photosData[i].urls.regular;
      imgHome[i].alt = photosData[i].alt_description;
      imgHome[i].setAttribute(
        "data-url",
        photosData[i].links.download + "&force=true"
      );
      ////////////////////////////////////////////
      ///////////////////////////////////////////
      ///////////////////&force=true////////////////////////
      /////////////////////////////////////////////
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
  const imageUrl = e.target.closest(".img__box").querySelector("img")
    .dataset.url;
  const imageId = e.target.closest(".img__box").querySelector("img").id;
  const index = saveSelectImg.indexOf(imageUrl);

  if (index !== -1) {
    saveSelectImg.splice(index, 1);
    imgBoxSvg[e.target.id].classList.remove("select__img");
  } else {
    sendimageUrlToBackend(imageUrl, imageId); //відправлення картинки на бекенд
    // Якщо посилання не знайдено в масиві, додаємо його
    saveSelectImg.push(imageUrl);
    imgBoxSvg[e.target.id].classList.add("select__img");
  }
  console.log(saveSelectImg);
}

for (let i = 0; i < imgBox.length; i++) {
  imgBox[i].addEventListener("click", funcSelect);
}
///////////download////////////
const uploadBTN = document.querySelector(".upload__BTN");
uploadBTN.addEventListener("click", () => {
  console.log(saveSelectImg, "//////////////////////////");
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
  // // Отримуємо список посилань з сервера
  // fetch("https://6537843dbb226bb85dd35975.mockapi.io/images")
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error("Помилка при виконанні запиту на сервер");
  //     }
  //   })
  //   .then((data) => {
  //     // Виводимо всі посилання в консоль
  //     data.forEach((item) => {
  //       console.log(item.url);
  //     });
  //     //качаю

  //     // Очищаємо бекенд (видаляємо всі файли на сервері)
  //     data.forEach((item) => {
  //       fetch(`https://6537843dbb226bb85dd35975.mockapi.io/images/${item.id}`, {
  //         method: "DELETE",
  //       })
  //         .then((response) => {
  //           if (!response.ok) {
  //             console.error("Помилка при видаленні файлу на сервері");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Помилка при видаленні файлу на сервері:", error);
  //         });
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Помилка при виконанні запиту на сервер:", error);
  //   });
});

//////////////////
