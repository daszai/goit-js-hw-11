// Add imports above this line
import { galleryItems } from "./gallery-items";
// Change code below this line

import "simplelightbox/dist/simple-lightbox.min.css";
import "simplelightbox/dist/simple-lightbox.min.js";

const gallery = document.querySelector(".gallery");

gallery.innerHTML = "";

for (let i = 0; i < galleryItems.length; i++) {
  gallery.innerHTML += `<a class="gallery__item" href="${galleryItems[i].original}">
  <img class="gallery__image" src="${galleryItems[i].preview}" alt="${galleryItems[i].description}" />
</a>`;
}

new SimpleLightbox(".gallery__item", {
  captionsData: "alt",
  captionDelay: 200,
});
