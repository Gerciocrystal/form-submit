"use strict";

const phone = document.querySelector("#phone");
const nextButton = document.querySelectorAll(".go-next");
const backButton = document.querySelectorAll(".go-back");
const section = document.querySelectorAll(".section");
const articleButton = document.querySelectorAll(".article--button");
const cardContainer = document.querySelector(".card_container");
const input__label = document.querySelectorAll(".input-label");
const periodLabel = document.querySelectorAll(".period__label");
const toggleInput = document.querySelector(".toggle-1__input");
const freeCash = document.querySelectorAll(".free--cash");
const uniTime = document.querySelectorAll(".unit");
const cash__amout = document.querySelectorAll(".cash-amout");
let periodLabelActive = document.querySelector(".active__period__label");

let navigation = 0;
const services_container = document.querySelector(".services");
const unit = {
  months: "mo",
  years: "yr",
  active: 0,
};

const renderService = (name, cash, id) => {
  const html = `<div class="service" id="id-${id}">
      <span class="name">${name}</span>
      <span class="service-cash">${cash}</span>
    </div>`;

  services_container.insertAdjacentHTML("beforeend", html);
};

const clearServie = () => {
  const services = document.querySelectorAll(".service");
  if (services) {
    services.forEach((service) => {
      service.remove();
    });
  }
};
const setData = () => {
  const cards = cardContainer.querySelectorAll(".card");
  const total__cash = document.querySelector("#cash--soma-total");
  clearServie();
  let total = 0;
  // services_container.parentNode.remove();
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("selected")) {
      document.querySelector("#name_confirm").innerHTML =
        cards[i].querySelector(".title").innerHTML;

      document.querySelector("#type_confirm").innerHTML =
        "(" + periodLabelActive.innerHTML + ")";

      document.querySelector("#cash_confirm").innerHTML =
        cards[i].querySelector(".cash").innerHTML;

      console.log(cards[i].querySelector(".cash-amout").innerHTML);
      total += Number(cards[i].querySelector(".cash-amout").innerHTML);
    }
  }

  for (let j = 0; j < input__label.length; j++) {
    if (input__label[j].classList.contains("selected")) {
      const name = input__label[j].querySelector(".h3--title").innerHTML;
      const cash = input__label[j].querySelector(".amount").innerHTML;

      console.log(input__label[j].querySelector(".cash-amout").innerHTML);
      total += Number(input__label[j].querySelector(".cash-amout").innerHTML);
      renderService(name, cash, j);
      // console.log(input__label[j]);
    }
  }
  console.log(total);
  total__cash.innerHTML = total;
};

const switchPage = (page) => {
  for (let i = 0; i < section.length; i++) {
    section[i].classList.remove("section--active");

    if (i != section.length - 1)
      articleButton[i].classList.remove("active--article--button");
  }
  section[page].classList.add("section--active");
  articleButton[page].classList.add("active--article--button");
};
const nextPage = (page) => {
  switchPage(page, "next");
};

for (let i = 0; i < nextButton.length; i++) {
  nextButton[i].addEventListener("click", () => {
    console.log(navigation);
    if (navigation == 0) {
      const code = /^[0-9]{9}$/;
      const phoneNumber = Number(phone.value);

      if (code.test(phoneNumber)) {
        nextPage(++navigation);
      } else {
        phone.classList.add("erro");
        document.querySelector(".erro-message").classList.remove("hidden");
      }
    } else {
      if (navigation == 2) setData();
      nextPage(++navigation);
    }
  });
}

for (let i = 0; i < backButton.length; i++) {
  backButton[i].addEventListener("click", () => {
    switchPage(--navigation);
  });
}
const cardsErase = () => {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) cards[i].classList.remove("selected");
};
cardContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const card = e.target;
  if (!card.classList.contains("card")) return;
  cardsErase();
  card.classList.add("selected");
});

const toggleLabel = () => {
  periodLabel[0].classList.toggle("active__period__label");
  periodLabel[1].classList.toggle("active__period__label");
  periodLabelActive = document.querySelector(".active__period__label");

  freeCash.forEach((free) => {
    free.classList.toggle("hidden");
  });
};
const yearCash = () => {
  for (let j = 0; j < cash__amout.length; j++) {
    console.log(cash__amout[j].innerHTML + " menos");
    cash__amout[j].innerHTML = Number(cash__amout[j].innerHTML * 10);
  }
};
const monthsCash = () => {
  for (let j = 0; j < cash__amout.length; j++) {
    console.log(cash__amout[j].innerHTML + " mais");
    cash__amout[j].innerHTML = Number(cash__amout[j].innerHTML / 10);
  }
};
const switchCash = () => {
  for (let i = 0; i < uniTime.length; i++) {
    if (periodLabel[0].classList.contains("active__period__label")) {
      uniTime[i].innerHTML = unit.months;
      unit.active = 0;
    } else {
      uniTime[i].innerHTML = unit.years;
      unit.active = 1;
    }
  }
};
toggleInput.addEventListener("change", (e) => {
  toggleLabel();
  switchCash();
  unit.active == 0 ? monthsCash() : yearCash();
});
for (let i = 0; i < input__label.length; i++) {
  input__label[i].addEventListener("click", () => {
    input__label[i].classList.toggle("selected");
  });
}
