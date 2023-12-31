import tracksList from "../assets/tracksList";

document.addEventListener("DOMContentLoaded", () => {
    const list = document.querySelector(".main__list");
    const searchInput = document.querySelector(".main__search-input");
    let currentTrack;

    const tracksListWithElem = [...tracksList].map((track) => {
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
        return {
            ...track,
            element: listItem,
            play: false,
            statusElement: listItem.querySelector(".main__list__item_play-btn"),
        };
    });

    searchInput.addEventListener("input", (e) => {
        tracksListWithElem.forEach((track) => {
            track.element.classList.toggle(
                "hide",
                !(
                    track.title
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    track.artists
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                )
            );
        });
    });

    const playButtons = document.querySelectorAll(".main__list__item_play-btn");
    const listItems = document.querySelectorAll("li");

    listItems.forEach((listItem, index) => {
        listItem.addEventListener("click", () => {
            tracksListWithElem.forEach((track) => {
                if (track.id === index + 1) {
                    if (currentTrack) {
                        currentTrack.pause();
                    }

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

                    if (document.querySelector(".footer")) {
                        document.querySelector(".footer").remove();
                    }

                    const playbar = document.createElement("footer");
                    playbar.className = "footer";
                    playbar.innerHTML = `
                    <img
                        class="footer__playbar_img"
                        src="${track.preview}"
                        alt="${track.title}"
                    />
                    <div class="footer__playbar__info">
                        <h2 class="footer__playbar__info_title">${track.title}</h2>
                        <p class="footer__playbar__info_author">${track.artists}</p>
                    </div>
                    <input type="range" class="footer__playbar__timerange" value="0" step="0.01" />
                    <p class="footer__playbar_duration">${duration}</p>
                `;
                    document.querySelector("body").append(playbar);
                    track.play = !track.play;
                    track.statusElement.innerHTML = track.play
                        ? "&#10073;&#10073;"
                        : "&#9654;";
                    track.element.classList.toggle("active", track.play);
                    const clonedPlayButton = playButtons[index].cloneNode(true);
                    playbar.insertBefore(
                        clonedPlayButton,
                        document.querySelector(".footer__playbar__info")
                    );

                    if (currentTrack) {
                        if (!(currentTrack.src === track.src)) {
                            currentTrack = new Audio(
                                tracksListWithElem[index].src
                            );
                        }
                    } else {
                        currentTrack = new Audio(tracksListWithElem[index].src);
                    }

                    if (track.play) {
                        currentTrack.play();
                    }

                    clonedPlayButton.addEventListener("click", () => {
                        if (track.id === index + 1) {
                            track.play = !track.play;
                            track.statusElement.innerHTML = track.play
                                ? "&#10073;&#10073;"
                                : "&#9654;";
                            clonedPlayButton.innerHTML = track.play
                                ? "&#10073;&#10073;"
                                : "&#9654;";
                            if (track.play) {
                                currentTrack.play();
                            } else {
                                currentTrack.pause();
                            }
                        } else {
                            track.play = false;
                            track.element.classList.remove("active");
                            track.statusElement.innerHTML = "&#9654;";
                            currentTrack.pause();
                        }
                    });

                    const updateDurationElement = () => {
                        currentTrack.addEventListener("timeupdate", () => {
                            const currentMinute = Math.floor(
                                currentTrack.currentTime / 60
                            );
                            const currentSecond = Math.floor(
                                currentTrack.currentTime % 60
                            );
                            const totalTime = currentTrack.duration;

                            playbarTimerange.value =
                                (currentTrack.currentTime / totalTime) * 100;

                            document.querySelector(
                                ".footer__playbar_duration"
                            ).textContent = `${
                                currentMinute < 10 ? "0" : ""
                            }${currentMinute}:${
                                currentSecond < 10 ? "0" : ""
                            }${currentSecond}`;
                        });
                    };

                    const playbarTimerange = playbar.querySelector(
                        ".footer__playbar__timerange"
                    );

                    playbarTimerange.addEventListener("input", () => {
                        const seekTime =
                            (playbarTimerange.value / 100) *
                            currentTrack.duration;
                        console.log(playbarTimerange.value);
                        currentTrack.currentTime = seekTime;
                    });

                    updateDurationElement();
                } else {
                    track.play = false;
                    track.element.classList.remove("active");
                    track.statusElement.innerHTML = "&#9654;";
                }
            });
        });
    });
});
