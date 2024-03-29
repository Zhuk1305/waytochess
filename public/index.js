const modalBg = document.querySelector(".modal-bg");
const modalZapis = document.querySelector(".zapis-modal");
const form = document.querySelector(".form");
const formModal = document.querySelector(".form-modal");
const btnRecord = document.querySelectorAll(".record");
const btnForm = document.querySelector(".btn-form");
const btnFormModal = document.querySelector(".btn-form_modal");
const btnFree = document.querySelector(".btn-free");
const specialBlock = document.querySelector(".special-block");
const nameErrorMessage = document.querySelector(".name-message");
const phoneErrorMessage = document.querySelector(".phone-message");
const checkErrorMessage = document.querySelector(".check-message");
const socialErrorMessage = document.querySelector(".social-message");
const nameModalErrorMessage = document.querySelector(".name-message_modal");
const phoneModalErrorMessage = document.querySelector(".phone-message_modal");
const checkModalErrorMessage = document.querySelector(".check-message_modal");
const socialModalErrorMessage = document.querySelector(".social-message_modal");

btnFree.addEventListener("click", () => {
  specialBlock.scrollIntoView(top);
});

function clickRecordBtn() {
  modalBg.classList.add("active");
  modalZapis.classList.add("active");
  document.body.style.overflow = "hidden";
}
function clickSubmitBtn() {
  modalBg.classList.remove("active");
  modalZapis.classList.remove("active");
  document.body.style.overflow = "auto";
  submitForm();
}

function addHadlerEventListener(elList, type) {
  for (let i = 0; i < elList.length; i++) {
    elList[i].addEventListener("click", () => {
      type === "record" && clickRecordBtn();
      type === "form" && clickSubmitBtn();
    });
  }
}
addHadlerEventListener(btnRecord, "record");

modalBg.addEventListener("click", () => {
  modalBg.classList.remove("active");
  modalZapis.classList.remove("active");
  document.body.style.overflow = "auto";
});
btnForm.addEventListener("click", (e) => {
  e.preventDefault();
  submitForm(form);
});
btnFormModal.addEventListener("click", (e) => {
  e.preventDefault();
  submitFormModal(formModal);
});

function sendData(formData) {
  console.log(formData);
  let formDataSend = {
    name: formData.Name.value,
    phone: formData.Phone.value,
    checkPesonal: formData.PersonalCheck.checked,
    checkSocial: [
      formData.SocialCheck[0].checked && "Звонок",
      formData.SocialCheck[1].checked && "Telegram",
      formData.SocialCheck[2].checked && "Viber",
      formData.SocialCheck[3].checked && "WathsApp",
    ],
  };
  let xhr = new XMLHttpRequest();

  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Email sent");
      formData.Name.value = "";
      formData.Phone.value = "";
      formData.PersonalCheck.checked = false;
      formData.SocialCheck[0].checked = false;
      formData.SocialCheck[1].checked = false;
      formData.SocialCheck[2].checked = false;
      formData.SocialCheck[3].checked = false;
    } else {
      alert("Something went wrong!");
    }
  };
  xhr.send(JSON.stringify(formDataSend));
}

function submitForm(currentForm) {
  if (
    !currentForm.Name.value ||
    !currentForm.Phone.value ||
    !currentForm.PersonalCheck.checked ||
    (!currentForm.SocialCheck[0].checked &&
      !currentForm.SocialCheck[1].checked &&
      !currentForm.SocialCheck[2].checked &&
      !currentForm.SocialCheck[3].checked)
  ) {
    console.log("click");
    !currentForm.Name.value
      ? nameErrorMessage.classList.add("error-message")
      : nameErrorMessage.classList.remove("error-message");
    !currentForm.Phone.value
      ? phoneErrorMessage.classList.add("error-message")
      : phoneErrorMessage.classList.remove("error-message");
    !currentForm.PersonalCheck.checked
      ? checkErrorMessage.classList.add("error-message")
      : checkErrorMessage.classList.remove("error-message");
    !currentForm.SocialCheck[0].checked &&
    !currentForm.SocialCheck[1].checked &&
    !currentForm.SocialCheck[2].checked &&
    !currentForm.SocialCheck[3].checked
      ? socialErrorMessage.classList.add("error-message")
      : socialErrorMessage.classList.remove("error-message");
  } else {
    nameErrorMessage.classList.remove("error-message");
    phoneErrorMessage.classList.remove("error-message");
    checkErrorMessage.classList.remove("error-message");
    socialErrorMessage.classList.remove("error-message");
    sendData(currentForm);
    console.log(
      "Name:",
      currentForm.Name.value,
      "\nPhone:",
      currentForm.Phone.value,
      "\nСогласен:",
      currentForm.PersonalCheck.checked && "да"
    );
  }
}

function submitFormModal(currentForm) {
  if (
    !currentForm.Name.value ||
    !currentForm.Phone.value ||
    !currentForm.PersonalCheck.checked ||
    (!currentForm.SocialCheck[0].checked &&
      !currentForm.SocialCheck[1].checked &&
      !currentForm.SocialCheck[2].checked &&
      !currentForm.SocialCheck[3].checked)
  ) {
    !currentForm.Name.value
      ? nameModalErrorMessage.classList.add("error-message")
      : nameModalErrorMessage.classList.remove("error-message");
    !currentForm.Phone.value
      ? phoneModalErrorMessage.classList.add("error-message")
      : phoneModalErrorMessage.classList.remove("error-message");
    !currentForm.PersonalCheck.checked
      ? checkModalErrorMessage.classList.add("error-message")
      : checkModalErrorMessage.classList.remove("error-message");
    !currentForm.SocialCheck[0].checked &&
    !currentForm.SocialCheck[1].checked &&
    !currentForm.SocialCheck[2].checked &&
    !currentForm.SocialCheck[3].checked
      ? socialModalErrorMessage.classList.add("error-message")
      : socialModalErrorMessage.classList.remove("error-message");
  } else {
    nameModalErrorMessage.classList.remove("error-message");
    phoneModalErrorMessage.classList.remove("error-message");
    checkModalErrorMessage.classList.remove("error-message");
    socialModalErrorMessage.classList.remove("error-message");
    sendData(currentForm);
    console.log(
      "Name:",
      currentForm.Name.value,
      "\nPhone:",
      currentForm.Phone.value,
      "\nСогласен:",
      currentForm.PersonalCheck.checked ? "да" : "нет"
    );
  }
}
