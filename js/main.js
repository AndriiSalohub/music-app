import tracksList from "../assets/tracksList";

const list = document.querySelector(".main__list");

console.log(tracksList);
tracksList.forEach((track) => {
    const listItem = document.createElement("li");
    listItem.className = "main__list__item";
    let duration =
        Math.floor(track.duration / 60) > 10
            ? `${Math.floor(track.duration / 60)}:${
                  track.duration % 60 > 10
                      ? track.duration % 60
                      : "0" + (track.duration % 60)
              }`
            : `0${Math.floor(track.duration / 60)}:${
                  track.duration % 60 > 10
                      ? track.duration % 60
                      : "0" + (track.duration % 60)
              }`;
    listItem.innerHTML = `
        <button class="main__list__item_play-btn">&#9654;</button>
        <img class="main__list__item_img" src=${track.preview} alt=${track.title} />
        <div class="main__list__item__info">
            <h2 class="main__list__item__info_title">${track.title}</h2>
            <p class="main__list__item__info_author">${track.artists}</p>
        </div>
        <p class="main__list__item_duration">${duration}</p>
    `;

    list.append(listItem);
});
