document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.getElementById("collectionsGallery");

    if (!gallery) return;

    const collectionImages = [
        "product1.jpg",
        "product5.jpg",
        "product6.jpg",
        "product7.jpg",
        "product8.jpg",
        "product9.jpg",
        "product10.jpg",
        "product2.jpg",
        "product11.jpg",
        "product3.jpg",
        "product12.jpeg",
        "product4.jpg",
    ];



    collectionImages.forEach(function (imageName, index) {

        const card = document.createElement("div");
        card.className = "collection-card";

        const image = document.createElement("img");

        image.src = "../assets/images/collections/" + imageName;
        image.alt = "Vatsalay Fashion Collection " + (index + 1);
        image.loading = "lazy";

        card.appendChild(image);

        gallery.appendChild(card);
    });

});