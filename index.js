////////////////////////////////
const accessKey = "AK8wCt8zfUTOsgY5nETTZBQvlMp5KzaV3apx7zdmcOI";
const NumbPictHome = 18;
const count = 18;
////////////////////////////////
const menuBTN = document.querySelector(".nav__menu__btn");
const Xbtn = document.querySelector(".close__modal__btn");
const modal = document.querySelector("#modal");

menuBTN.addEventListener("click", () => {
  modal.style.transform = "translateX(0%)";
});
Xbtn.addEventListener("click", () => {
  modal.style.transform = "translateX(100%)";
});
///

const imagesBox = document.querySelector(".images__box");
for (let i = 0; i < NumbPictHome; i++) {
  imagesBox.insertAdjacentHTML("afterbegin", '<img class="img__home" />');
}

///
const imgHome = document.querySelectorAll(".img__home");
const topic = "people";

axios
  .get(
    `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`
    //`https://api.unsplash.com/topics/${topic}/photos?client_id=${accessKey}&per_page=${NumbPictHome}`
  )
  .then((response) => {
    const photosData = response.data;
    console.log(photosData);
    for (let i = 0; i < imgHome.length; i++) {
      imgHome[i].src = photosData[i].urls.regular;
      imgHome[i].alt = photosData[i].alt_description;
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
  console.log(e.target.value);
  let query = e.target.value;
  foundPhotoBox.innerHTML = ``;
  axios
    .get(
      `https://api.unsplash.com/search/collections?client_id=${accessKey}&per_page=${NumbPictHome}&query=${query}`
    )
    .then((response) => {
      const photosData = response.data;
      for (let i = 0; i < 9; i++) {
        console.log(photosData.results[0].cover_photo.urls.regular);
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

////////////////////
