"use strict";

////////////////////////// FORM-VALIDATION ////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");

  const showError = (input, message) => {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector("small");
    formGroup.classList.add("error");
    small.textContent = message;
    small.style.visibility = "visible";
  };

  const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove("error");
    const small = formGroup.querySelector("small");
    small.style.visibility = "hidden";
  };

  const checkEmail = (input) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, "Email is not valid");
    }
  };

  const checkRequired = (inputArr) => {
    inputArr.forEach((input) => {
      if (input.value.trim() === "") {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSuccess(input);
      }
    });
  };

  const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  };
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      checkRequired([nameInput, emailInput, messageInput]);
      checkEmail(emailInput);

      const allValid = [...form.querySelectorAll(".form__input")].every(
        (input) => input.parentElement.classList.contains("error") === false
      );

      if (allValid) {
        alert("Form submitted successfully!");
        form.reset();
      }
    });
  }
});

////////////////////////// SECTION-AUDIO ////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const img2 = document.querySelector("#img");
  const playPause = document.querySelector("#playpause");
  const playPauseBtn = document.querySelector("#playpause-btn");
  const audio = document.querySelector("#audio");
  const title = document.querySelector("#title");
  const prevBtn2 = document.querySelector("#prevbtn");
  const nextBtn2 = document.querySelector("#nextbtn");
  const progress = document.querySelector("#progress");
  const progressBar = document.querySelector(".progress-bar");
  const currTime = document.querySelector(".current-time");
  const totalDuration = document.querySelector(".duration-time");
  const volume = document.querySelector("#volume");
  const layer = document.querySelector(".layer");
  const volBar = document.querySelector(".bar");
  const progressLine = document.querySelector(".progress-line");
  const volumeRange = document.querySelector(".volumerange");
  const repeatBtn = document.querySelector("#repeat");
  const likeBtn = document.querySelector("#like");
  const likeIcon = document.querySelector("#likeicon");
  const songListBtn = document.querySelector("#list");
  const songList = document.querySelector("#songs-list");
  const listCloseBtn = document.querySelector("#listclose");
  // songs array

  const songs = [
    {
      path: "./music/Sufjan Stevens 1.mp3",
      displayName: "Call Me By Your Name",
      artist: "Sufjan Stevens",
      cover:
        "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
    },
    {
      path: "./music/Sufjan Stevens 2.mp3",
      displayName: "So You Are Tired",
      artist: "Sufjan Stevens",
      cover: "https://pbs.twimg.com/media/D2NZH-2U4AAL9Xs.jpg",
    },
    {
      path: "./music/Sufjan Stevens 3.mp3",
      displayName: "Once Upon A Pool Side",
      artist: "Sufjan Stevens",
      cover:
        "https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg",
    },
  ];

  // deafult song index

  let songIndex = 2;

  // song default state

  let isPlaying = false;

  // song pause function

  function playSong() {
    isPlaying = true;
    playPauseBtn.classList.replace("fa-play", "fa-pause");
    audio.play();
  }

  // song play function

  function pauseSong() {
    isPlaying = false;
    playPauseBtn.classList.replace("fa-pause", "fa-play");
    audio.pause();
  }

  // loading songs

  function loadSong(song) {
    img2.src = song.cover;
    title.textContent = song.displayName;
    audio.src = song.path;
  }

  // previous song

  function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

  // next song

  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

  // progress bar function
  // console.log(audio.duration);

  function updateProgress(e) {
    if (isPlaying) {
      const { duration, currentTime } = e.target;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.value = progressPercent;
      progressLine.style.width = `${progressPercent}%`;
      if (progressPercent == 100) {
        return nextSong();
      }
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
      }
      // Calculate display for currentTime
      let currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currTime.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }

  function progressSlide(e) {
    const { value } = e.target;
    const progressTime = Math.ceil((audio.duration / 100) * value);
    audio.currentTime = progressTime;
    console.log(progressTime);
    if (!isPlaying) {
      progressLine.style.width = `${value}%`;
    }
  }

  function volumeBar() {
    layer.classList.toggle("hide");
    setTimeout(() => {
      if (layer.classList.contains("hide")) {
        layer.classList.remove("hide");
      }
    }, 5000);
  }

  function setVolume() {
    audio.volume = volumeRange.value;
    const barWidth = (volumeRange.value / 1) * 100;
    volBar.style.width = `${barWidth}%`;
  }

  function repeat() {
    repeatBtn.classList.toggle("color");
    const repeatBtnState = repeatBtn.classList.contains("color");
    if (repeatBtnState) {
      audio.loop = true;
      loadSong();
    } else {
      audio.loop = false;
      loadSong();
    }
  }

  // function like(){
  //   likeBtn.classList.toggle('color');
  //   if(likeBtn.classList.contains("color")){
  //   likeIcon.classList.replace("far","fas");
  // }else{
  //   likeIcon.classList.replace("fas","far");
  // }}

  function like() {
    if (likeBtn.classList.toggle("color")) {
      likeIcon.classList.replace("far", "fas");
    } else {
      likeIcon.classList.replace("fas", "far");
    }
  }

  function musicList() {
    songList.classList.toggle("showlist");
    listCloseBtn.addEventListener("click", () => {
      songList.classList.remove("showlist");
    });
  }

  if (
    playPause &&
    prevBtn2 &&
    nextBtn2 &&
    audio &&
    progress &&
    volume &&
    volumeRange &&
    repeatBtn &&
    likeBtn &&
    songListBtn
  ) {
    playPause.addEventListener("click", () =>
      isPlaying ? pauseSong() : playSong()
    );

    prevBtn2.addEventListener("click", prevSong);
    nextBtn2.addEventListener("click", nextSong);
    audio.addEventListener("timeupdate", updateProgress);
    progress.addEventListener("input", progressSlide);
    volume.addEventListener("click", volumeBar);
    volumeRange.addEventListener("input", setVolume);
    repeatBtn.addEventListener("click", repeat);
    likeBtn.addEventListener("click", like);
    songListBtn.addEventListener("click", musicList);
  }
});

////////////////////////// SECTION-ALBUMS////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const album = [
    {
      id: 1,
      title: "Goodbye Evergreen",
      category: "javelin",
      duration: " 3 : 25",
      img: "./imgs/img.jpg",
      link: "https://www.youtube.com/watch?v=7q6EHqYM2Zw&list=PLcCRbLljsLUebHRZlj9xCVZb5mB1UiHA_",
      date: `Oct 6, 2023 `,
    },
    {
      id: 2,
      title: "A Running Start",
      category: "javelin",
      duration: "4 : 21",
      img: "./imgs/img.jpg",
      link: "https://www.youtube.com/watch?v=GoFJbrNkyBw&list=PLcCRbLljsLUebHRZlj9xCVZb5mB1UiHA_&index=2",
      date: `Oct 6, 2023 `,
    },
    {
      id: 3,
      title: "Everything That Rises ",
      category: "javelin",
      duration: "5 : 00",
      img: "./imgs/img.jpg",
      link: "https://www.youtube.com/watch?v=4l7fcLyVfJ0&list=OLAK5uy_nU-WnMZcwFMjKV2cmtqKT0DayMpvtH4R8&index=2",
      date: `Oct 6, 2023`,
    },
    {
      id: 4,
      title: "Video Game ",
      category: "The-Ascension",
      duration: "4 : 37",
      img: "./imgs/img2.jpg",
      link: "https://www.youtube.com/watch?v=3fCdZzsP4U0&list=PLcCRbLljsLUcAYwe6zy0R2q-x8L7Igqru&index=2",
      date: `Aug 13, 2020`,
    },
    {
      id: 5,
      title: "Run Away With Me ",
      category: "The-Ascension",
      duration: "4 : 01",
      img: "./imgs/img2.jpg",
      link: "https://www.youtube.com/watch?v=JjRSCm67bL4&list=PLcCRbLljsLUcAYwe6zy0R2q-x8L7Igqru&index=5",
      date: `Sep 25, 2020`,
    },
    {
      id: 6,
      title: "Meditation I",
      category: "Convocations",
      duration: "3 : 40",
      img: "./imgs/img3.jpg",
      link: "https://www.youtube.com/watch?v=MpA_-YSNvQo&list=PLcCRbLljsLUeFvLlMgbLbjrp-ORBp97U1&index=1",
      date: `Apr 8, 2021`,
    },
    {
      id: 7,
      title: "Meditation II",
      category: "Convocations",
      duration: "2 : 32",
      img: "./imgs/img3.jpg",
      link: "https://www.youtube.com/watch?v=bwpuKCB23l8&list=PLcCRbLljsLUeFvLlMgbLbjrp-ORBp97U1&index=2",
      date: `Apr 8, 2021`,
    },
    {
      id: 8,
      title: "Meditation III",
      category: "Convocations",
      duration: "2 : 11",
      img: "./imgs/img3.jpg",
      link: "https://www.youtube.com/watch?v=U--iJtEBef8&list=PLcCRbLljsLUeFvLlMgbLbjrp-ORBp97U1&index=3",
      date: `Apr 8, 2021`,
    },
    {
      id: 9,
      title: "Meditation IV",
      category: "Convocations",
      duration: "4 : 32",
      img: "./imgs/img3.jpg",
      link: "https://www.youtube.com/watch?v=RB_wUKYyKEE&list=PLcCRbLljsLUeFvLlMgbLbjrp-ORBp97U1&index=4",
      date: `Apr 8, 2021`,
    },
    {
      id: 10,
      title: "Meditation V",
      category: "Convocations",
      duration: "2 : 31",
      img: "./imgs/img3.jpg",
      link: "https://www.youtube.com/watch?v=c_GeokTnTkk&list=PLcCRbLljsLUeFvLlMgbLbjrp-ORBp97U1&index=5",
      date: `Apr 8, 2021`,
    },

    {
      id: 11,
      title: "Meditation VI",
      category: "Convocations",
      duration: "3 : 31",
      img: "./imgs/img3.jpg",
      link: "https://www.youtube.com/watch?v=xE-9yqwO2Ig&list=PLcCRbLljsLUeFvLlMgbLbjrp-ORBp97U1&index=6",
      date: `Apr 8, 2021`,
    },

    {
      id: 12,
      title: "Meditation VII",
      category: "Convocations",
      duration: "2 : 40",
      img: "./imgs/img3.jpg",
      link: "https://www.youtube.com/watch?v=5YCcqikyBD0&list=PLcCRbLljsLUeFvLlMgbLbjrp-ORBp97U1&index=7",
      date: `Apr 8, 2021`,
    },

    {
      id: 13,
      title: "The Dress Looks Nice on You",
      category: "Seven-Swans",
      duration: " 2 : 33 ",
      img: "./imgs/img4.jpg",
      link: "https://www.youtube.com/watch?v=4l7fcLyVfJ0&list=OLAK5uy_nU-WnMZcwFMjKV2cmtqKT0DayMpvtH4R8&index=2",
      date: `March 16, 2004`,
    },

    {
      id: 14,
      title: "To Be Alone With You",
      category: "Seven-Swans",
      duration: "2 : 48",
      img: "./imgs/img4.jpg",
      link: "https://www.youtube.com/watch?v=N3zu9NucyBg&list=OLAK5uy_nU-WnMZcwFMjKV2cmtqKT0DayMpvtH4R8&index=4",
      date: `March 16, 2004`,
    },
  ];
  // get parent element
  const sectionCenter = document.querySelector(".album-container");
  const btnContainer = document.querySelector(".btn-container");
  // display all items when page loads
  window.addEventListener("DOMContentLoaded", function () {
    diplayMenuItems(album);
    displayMenuButtons();
  });

  function diplayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
      // console.log(item);

      return `
         <article class="album-item">
            <div class="album-img-box">
              <img src=${item.img} alt=${item.title} class="album-img" />

              <a href=${item.link} target="_blank" class="play-link">
                <i class="play-btn fa-solid fa-circle-play"></i>
              </a>
            </div>

            <div class="album-info">
              <header>
                <h4 class="card-heading">${item.title}</h4>
              </header>
              <div class="album-text-box">
                <p class="album-duration">${item.duration}</p>
                <div class="line">&nbsp;</div>
                <p class="album-date">${item.date}</p>
              </div>
            </div>
          </article>

        `;
    });
    displayMenu = displayMenu.join("");
    // console.log(displayMenu);
    if (sectionCenter) {
      sectionCenter.innerHTML = displayMenu;
    }
  }
  function displayMenuButtons() {
    const categories = album.reduce(
      function (values, item) {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      },
      ["all"]
    );
    const categoryBtns = categories
      .map(function (category) {
        return `<button type="button" class="filter-btn" data-id=${category}>
          ${category}
        </button>`;
      })
      .join("");

    if (btnContainer) {
      btnContainer.innerHTML = categoryBtns;
      const filterBtns = btnContainer.querySelectorAll(".filter-btn");
      // console.log(filterBtns);

      filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          // console.log(e.currentTarget.dataset);
          const category = e.currentTarget.dataset.id;
          const menuCategory = album.filter(function (menuItem) {
            // console.log(menuItem.category);
            if (menuItem.category === category) {
              return menuItem;
            }
          });
          if (category === "all") {
            diplayMenuItems(album);
          } else {
            diplayMenuItems(menuCategory);
          }
        });
      });
    }
  }
});

////////////////////////// SECTION-ABOUT MODAL ////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const btnCloseModal = document.querySelector(".close-modal");
  const overlay = document.querySelector(".overlay");

  const btnOpenModal = document.querySelector(".btn-about");

  const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  if (btnOpenModal) {
    btnOpenModal.addEventListener("click", openModal);
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", function (e) {
    // console.log(e.key);

    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});

////////////////////////// SECTION-ABOUT CARD ////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  // Local events data
  const events = [
    {
      id: 1,
      date: "September 4, 2024",
      heading: "Rhythm Fest",
      location: "New York City, USA",
      img: "./imgs/event-1.jpg",
    },
    {
      id: 2,
      date: "October 10, 2024",
      heading: "Jazz Nights",
      location: "Chicago, USA",
      img: "./imgs/event-2.jpg",
    },
    {
      id: 3,
      date: "November 15, 2024",
      heading: "Rock Carnival",
      location: "Los Angeles, USA",
      img: "./imgs/event-3.jpg",
    },
    {
      id: 4,
      date: "December 20, 2024",
      heading: "Pop Fiesta",
      location: "Miami, USA",
      img: "./imgs/event-4.jpg",
    },
    {
      id: 5,
      date: "January 8, 2025",
      heading: "Winter Jam",
      location: "Seattle, USA",
      img: "./imgs/event-5.jpg",
    },
    {
      id: 6,
      date: "February 14, 2025",
      heading: "Love Music Fest",
      location: "San Francisco, USA",
      img: "./imgs/event-6.jpg",
    },
  ];

  // Select items
  const cardImg = document.querySelector(".card-img");
  const cardDate = document.querySelector(".card-date");
  const cardHeading = document.querySelector(".card-heading");
  const cardLocation = document.querySelector(".location-text");

  const prevBtn = document.querySelector(".btn-card-left");
  const nextBtn = document.querySelector(".btn-card-right");

  // Set starting item
  let currentItem = 0;

  // Load initial item
  window.addEventListener("DOMContentLoaded", function () {
    const item = events[currentItem];
    if (cardImg) {
      cardImg.src = item.img;
    }

    if (cardDate) {
      cardDate.textContent = item.date;
    }

    if (cardHeading) {
      cardHeading.textContent = item.heading;
    }

    if (cardLocation) {
      cardLocation.textContent = item.location;
    }
  });

  // Show event based on item
  function showEvent(eventIndex) {
    const item = events[eventIndex];
    cardImg.src = item.img;
    cardDate.textContent = item.date;
    cardHeading.textContent = item.heading;
    cardLocation.textContent = item.location;
  }

  // Show next event
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      currentItem++;
      if (currentItem > events.length - 1) {
        currentItem = 0;
      }
      showEvent(currentItem);
    });
  }

  // Show previous event
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      currentItem--;
      if (currentItem < 0) {
        currentItem = events.length - 1;
      }
      showEvent(currentItem);
    });
  }
});
