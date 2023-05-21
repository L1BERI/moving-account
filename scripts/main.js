window.addEventListener('DOMContentLoaded', function () {
  var firstTabContentId = 'home';
  var firstChatContentId = 'alexa';
  var firstTabElement = document.querySelector('.aside-menu__list li:first-child');
  var firstChatElement = document.querySelector('.chat-users__list li:first-child');

  showContent(firstTabContentId, firstTabElement);
  showChat(firstChatContentId, firstChatElement)
});

function showContent(contentId, tabElement) {
  // Скрыть все элементы контента
  var contentElements = document.getElementsByClassName('main__content');
  for (var i = 0; i < contentElements.length; i++) {
    contentElements[i].classList.add('hidden');
  }

  // Показать выбранный элемент контента
  var selectedContent = document.getElementById(contentId);
  selectedContent.classList.remove('hidden');

  // Удалить класс "tabActive" у всех ссылок в меню
  var tabElements = document.getElementsByClassName('aside-menu__list')[0].getElementsByTagName('li');
  for (var i = 0; i < tabElements.length; i++) {
    tabElements[i].classList.remove('tabActive');
  }

  // Добавить класс "tabActive" к активной ссылке в меню
  tabElement.classList.add('tabActive');
}
function showChat(chatId, element) {
  // Скрываем все блоки с классом "chat-content__inner"
  var chatContents = document.querySelectorAll('.chat-content__inner');
  chatContents.forEach(function (chatContent) {
    chatContent.classList.add('hidden');
  });

  // Показываем выбранный чат по ID
  var chat = document.getElementById(chatId);
  chat.classList.remove('hidden');

  // Удаляем класс "chat-users__item-active" у всех элементов списка пользователей
  var chatUsers = document.querySelectorAll('.chat-users__item');
  chatUsers.forEach(function (chatUser) {
    chatUser.classList.remove('chat-users__item-active');
  });

  // Добавляем класс "chat-users__item-active" выбранному элементу списка пользователей
  element.classList.add('chat-users__item-active');
}
const ratings = document.querySelectorAll('.rating');

if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  let ratingActive, ratingValue;

  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();

    if (rating.classList.contains('rating_set')) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.rating__value');
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item');

    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener('mouseenter', function (e) {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        initRatingVars(rating);
        if (rating.dataset.ajax) {
          setRatingValue(ratingItem.value, rating);
        } else {
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
        }
      });
    }
  }
}

let activateBtns = document.querySelectorAll('.activate');
let deactivateBtns = document.querySelectorAll('.deactivate');
let cardTitle = document.querySelectorAll('.cards-item__title');
let cardText = document.querySelectorAll('.cards-item__text')
let cardCap = document.querySelectorAll('.cards-item__cap');
let cardItem = document.querySelectorAll('.cards-item');


activateBtns.forEach((activateBtn, index) => {
  activateBtn.addEventListener('click', function (e) {
    e.preventDefault();
    activateBtn.style.display = 'none';
    deactivateBtns[index].style.display = 'flex';
    cardTitle[index].style.color = '#25252D'
    cardText[index].style.color = '#25252D'
    let cardCaps = cardItem[index].querySelectorAll('.cards-item__cap');
    cardCaps.forEach((cardCap) => {
      cardCap.style.color = '#858589';
    });
    let cardLinks = cardItem[index].querySelectorAll('.card-link');
    cardLinks.forEach((cardLink) => {
      cardLink.style.color = '#6B7EEC';
    });
  });

  deactivateBtns[index].addEventListener('click', function (e) {
    e.preventDefault();
    deactivateBtns[index].style.display = 'none';
    activateBtn.style.display = 'flex';
    cardTitle[index].style.color = '#D3D3D5'
    cardText[index].style.color = '#D3D3D5'
    let cardCaps = cardItem[index].querySelectorAll('.cards-item__cap');
    cardCaps.forEach((cardCap) => {
      cardCap.style.color = '#D3D3D5';
    });
    let cardLinks = cardItem[index].querySelectorAll('.card-link');
    cardLinks.forEach((cardLink) => {
      cardLink.style.color = '#dbe0fa';
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const accordionItem = this.parentNode;

      accordionItem.classList.toggle('active');

      const accordionContent = accordionItem.querySelector('.accordion-content');

      if (accordionItem.classList.contains('active')) {
        accordionContent.style.display = 'block';
      } else {
        accordionContent.style.display = 'none';
      }
    });
  });
});


const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const accordionContent = header.nextElementSibling;
    if (accordionContent.style.display === 'block') {
      accordionContent.style.display = 'none';

    } else {
      accordionContent.style.display = 'block';

    }
  });
});

let ModalOpenBtn = document.querySelectorAll('.open-modal');
let ModalCloseBtn = document.querySelectorAll('.close-modal');
let billsModal = document.querySelector('.bills__modal');
let couponsModal = document.querySelector('.coupons-modal');
let billsSuccesModal = document.querySelector('.bills__modal-succes');
let billsModalForm = document.querySelector('.bills-modal__form');


billsModalForm.addEventListener('submit', event => {
  event.preventDefault(); // Отмена отправки формы

  // Проверка заполненности всех полей формы
  if (billsModalForm.checkValidity()) {
    // Если все поля заполнены, открываем второе модальное окно
    billsModal.style.display = 'none';

    billsSuccesModal.style.display = 'block';
  }
});
ModalOpenBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    billsModal.style.display = "block";
    couponsModal.style.display = 'block'
  });
});

ModalCloseBtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    billsModal.style.display = "none";
    couponsModal.style.display = 'none'
    billsSuccesModal.style.display = "none";
  });
});









let couponsModalChooseAdvBtn = document.querySelector('.coupons-modal__adv-btn');
let couponsModalChooseCoupBtn = document.querySelector('.coupons-modal__coupon-btn');
let couponsTotalPrice = document.querySelector('.total-price__value');
let couponsModalChooseBackground = document.querySelector('.coupons-modal__btn-background');

couponsModalChooseAdvBtn.addEventListener('click', function () {
  this.style.color = 'var(--color-white)';
  this.classList.add('couponsChooseAdvActive');
  couponsModalChooseCoupBtn.classList.remove('couponsChooseCoupActive');
  couponsModalChooseCoupBtn.style.color = 'var(--color-primary)';
  couponsModalChooseBackground.style.left = 'calc(50% - 2px)';
  couponsModalChooseBackground.style.right = '2px';
  couponsModalChooseBackground.style.maxWidth = '122px';
  couponsTotalPrice.innerHTML = '10$';

})
couponsModalChooseCoupBtn.addEventListener('click', function () {
  this.style.color = 'var(--color-white)';
  this.classList.add('couponsChooseCoupActive');
  couponsModalChooseAdvBtn.classList.remove('couponsChooseAdvActive');
  couponsModalChooseAdvBtn.style.color = 'var(--color-primary)';
  couponsModalChooseBackground.style.right = 'calc(50% - 2px)';
  couponsModalChooseBackground.style.left = '2px';
  couponsModalChooseBackground.style.maxWidth = '109px';
  couponsTotalPrice.innerHTML = '5$';
})


let couponsSelectClient = document.querySelector('.coupons-modal__location');
let couponsSelectService = document.querySelector('.coupons-modal__services');

let couponsSelectClientLabel = document.querySelector('.coupons-modal__loc-label');
let couponsSelectServLabel = document.querySelector('.coupons-modal__serv-label');



couponsSelectClient.addEventListener('change', function () {
  if (couponsSelectClient.value) {
    couponsSelectClientLabel.classList.add('select-active')
    this.style.border = "2px solid #6B7EEC"
  } else {
    this.style.border = "2px solid #E5E5E6"
    couponsSelectClientLabel.classList.remove('select-active')
  }
})
couponsSelectService.addEventListener('change', function () {
  if (couponsSelectService.value) {
    couponsSelectServLabel.classList.add('select-active')
    this.style.border = "2px solid #6B7EEC"
  } else {
    this.style.border = "2px solid #E5E5E6"
    couponsSelectServLabel.classList.remove('select-active')
  }
})


let imagePreviewWrapper = document.querySelector('.imagePreview-wrapper');
let imageInput = document.querySelector('.coupons-modal__file');
let imagePreviewDeleteBtn = document.querySelector('.imagePreview-delete');
let imagePreview = document.querySelector(".imagePreview");
let couponsAddPhotoBtn = document.querySelector('.coupons-modal__add-image-wrapper')
let imagePreviewName = document.querySelector('.imagePreview-text');

imageInput.addEventListener("change", function () {
  var file = imageInput.files[0];
  var reader = new FileReader();
  imagePreviewWrapper.style.display = 'flex';
  reader.onload = function (e) {
    var image = document.createElement("img");
    image.src = e.target.result;
    imagePreview.appendChild(image);
    couponsAddPhotoBtn.style.display = 'none'
  };

  reader.readAsDataURL(file);
  var fileName = file.name;
  imagePreviewName.textContent = fileName;
});

imagePreviewDeleteBtn.addEventListener('click', function () {
  imageInput.value = "";
  imagePreview.innerHTML = "";
  couponsAddPhotoBtn.style.display = 'flex'
  imagePreviewWrapper.style.display = 'none';
})


let actionImageInput = document.querySelectorAll('.actionImageInput');
let actionVideoInput = document.querySelectorAll('.actionVideoInput');
let actionPreviewImage = document.querySelector('.imageActionPreview');
let actionPreviewImageText = document.querySelectorAll('.uploaded-files__image-name');
let actionPreviewVideoText = document.querySelectorAll('.uploaded-files__video-name');
let actionPreviewVideoWrapper = document.querySelectorAll('.uploaded-files__video');
let actionPreviewImageWrapper = document.querySelectorAll('.uploaded-files__image');
let actionPreviewVideoDelete = document.querySelectorAll('.uploaded-filex__video-delete');
let actionPreviewImageDelete = document.querySelectorAll('.uploaded-filex__image-delete');

let actionPreviewImageTextValue;

actionImageInput.forEach(function (input) {
  input.addEventListener('change', function () {
    var file = input.files[0];
    var readerAction = new FileReader();

    actionPreviewImageWrapper.forEach(wrapper => {
      wrapper.style.display = 'flex';
    });

    readerAction.readAsDataURL(file);
    var fileName = file.name;
    actionPreviewImageText.forEach(textImage => {
      textImage.textContent = fileName;
      actionPreviewImageTextValue = fileName; // Присваиваем значение переменной
    });

  });
});



let actionPreviewVideoTextValue;

actionVideoInput.forEach(function (input) {
  input.addEventListener('change', function () {
    var file = input.files[0];
    var readerAction = new FileReader();

    actionPreviewVideoWrapper.forEach(wrapper => {
      wrapper.style.display = 'flex';
    });

    readerAction.onload = function (e) {
      // Добавление превью видео, если требуется
    };

    readerAction.readAsDataURL(file);
    var fileName = file.name;
    actionPreviewVideoText.forEach(textVideo => {
      textVideo.textContent = fileName;
      actionPreviewVideoTextValue = fileName; // Присваиваем значение переменной
    });
  });
});


actionPreviewVideoDelete.forEach(function (deleteButton) {
  deleteButton.addEventListener('click', function (e) {
    e.preventDefault();
    actionVideoInput.forEach(function (input) {
      input.value = '';
    });
    actionPreviewVideoText.forEach(function (text) {
      text.textContent = '';
    });
    actionPreviewVideoWrapper.forEach(function (wrapper) {
      wrapper.style.display = 'none';
    });
  });
});

actionPreviewImageDelete.forEach(function (deleteButton) {
  deleteButton.addEventListener('click', function (e) {
    e.preventDefault();
    actionImageInput.forEach(function (input) {
      input.value = '';
    });
    actionPreviewImageText.forEach(function (text) {
      text.textContent = '';
    });
    actionPreviewImageWrapper.forEach(function (wrapper) {
      wrapper.style.display = 'none';
    });
  });
});


function displaySelectedValue() {
  let selectServices = document.querySelector(".coupons-modal__services");
  let selectLocation = document.querySelector(".coupons-modal__location");

  let selectedServicesValue = document.querySelector(".total-price__services");
  let selectedLocationValue = document.querySelector(".total-price__location");


  let couponsPriceWrapper = document.querySelector('.coupons-modal__total-price');



  let selectedServicesOption = selectServices.options[selectServices.selectedIndex].value;
  let selectedLocationOption = selectLocation.options[selectLocation.selectedIndex].value;
  selectedServicesValue.textContent = selectedServicesOption;
  selectedLocationValue.textContent = selectedLocationOption;
  if (selectServices.value && selectLocation.value) {
    couponsPriceWrapper.style.display = 'block'
  } else {
    couponsPriceWrapper.style.display = 'none'
  }

}


// Last message

// let chatMessages = document.querySelectorAll('.messenger-chat__inner .messenger-chat__message-wrapper .messenger-chat__message');
// let chatLastMessages = chatMessages[chatMessages.length - 1];

// let chatSendBtn = document.querySelector('.messenger-action__send-button');

// chatSendBtn.addEventListener('click', function (e) {
//   e.preventDefault();

// })





function sendMessage(chatId) {
  var chat = document.getElementById(chatId);

  let chatTextMessage = chat.querySelector('.messenger-action__message');
  let chatContainer = chat.querySelector('.messenger-chat__messages');
  let testvar = chat.querySelector('.messenger-chat');
  let chatMessageWrapper = chat.querySelectorAll('.messenger-chat__message-wrapper');
  let chatUserLastMessage = chat.querySelector('.chat-users__message-value');




  let messageText = chatTextMessage.value.trim();
  let finalMessage;
  if (messageText !== '') {
    let messageWrapper = document.createElement('div');
    let messageContent = document.createElement('p');
    let sentContent = document.createElement('p');

    messageWrapper.classList.add('messenger-chat__message-wrapper');
    messageContent.classList.add('messenger-chat__message');
    sentContent.classList.add('messenger-chat__sent', 'text-caption');

    messageContent.textContent = chatTextMessage.value;
    sentContent.textContent = 'Sent';

    messageWrapper.appendChild(messageContent);
    messageWrapper.appendChild(sentContent);
    chatContainer.appendChild(messageWrapper);
    finalMessage = messageText;
    if (testvar.scrollHeight >= 668) {
      testvar.scrollTop = testvar.scrollHeight;
    }

    chatTextMessage.value = '';
  } else if (actionPreviewImageTextValue !== '' || actionPreviewVideoTextValue !== '') {
    let messageWrapper;

    if (actionPreviewImageTextValue !== '' && typeof actionPreviewImageTextValue !== 'undefined') {
      messageWrapper = document.createElement('div');
      var imageElement = document.createElement('img');
      let messageImage = document.createElement('p');
      let sentContent = document.createElement('p');

      imageElement.src = 'content/icons/fileImageWhiteUploadChat-logo.svg';
      messageWrapper.classList.add('messenger-chat__message-wrapper');
      messageImage.classList.add('messenger-chat__message', 'fileMessage');
      sentContent.classList.add('text-caption', 'messenger-chat__sent');

      messageImage.textContent = actionPreviewImageTextValue;
      sentContent.textContent = 'Sent';

      messageImage.appendChild(imageElement);
      messageWrapper.appendChild(messageImage);
      messageWrapper.appendChild(sentContent);
      chatContainer.appendChild(messageWrapper);
      finalMessage = actionPreviewImageTextValue;
      actionImageInput.forEach(function (input) {
        input.value = '';
      });
      actionPreviewImageTextValue = '';
      actionPreviewImageWrapper.forEach(function (wrapper) {
        wrapper.style.display = 'none';
      });
    }

    if (actionPreviewVideoTextValue !== '' && typeof actionPreviewVideoTextValue !== 'undefined') {
      messageWrapper = document.createElement('div');
      var videoElement = document.createElement('img');
      let messageVideo = document.createElement('p');
      let sentContent = document.createElement('p');

      videoElement.src = 'content/icons/fileVideoWhiteUploadChat-logo.svg';
      messageWrapper.classList.add('messenger-chat__message-wrapper');
      messageVideo.classList.add('messenger-chat__message', 'fileMessage');
      sentContent.classList.add('text-caption', 'messenger-chat__sent');

      messageVideo.textContent = actionPreviewVideoTextValue;
      sentContent.textContent = 'Sent';

      messageVideo.appendChild(videoElement);
      messageWrapper.appendChild(messageVideo);
      messageWrapper.appendChild(sentContent);
      chatContainer.appendChild(messageWrapper);
      finalMessage = actionPreviewVideoTextValue;
      actionVideoInput.forEach(function (input) {
        input.value = '';
      });
      actionPreviewVideoTextValue = ''
      actionPreviewVideoWrapper.forEach(function (wrapper) {
        wrapper.style.display = 'none';
      });

    }

    chatContainer.appendChild(messageWrapper);
  }

  if (chatMessageWrapper.length > 0) {
    let lastSentMessage = chatMessageWrapper[chatMessageWrapper.length - 1];
    lastSentMessage.classList.add('sent');
  }

  if (testvar.scrollHeight >= 668) {
    testvar.scrollTop = testvar.scrollHeight;
  }
  updateLastMessage(chatId, finalMessage);
}


function updateLastMessage(chatId, finalMessage) {
  let usersList = document.getElementById('chat-users__list');
  var chat = usersList.querySelector('#' + chatId);
  let lastMessageUser = chat.querySelector('.chat-users__message-value');
  lastMessageUser.textContent = finalMessage;
}



function sendMessageModal(chatId) {
  let chatModal = document.querySelector('.chat-call__modal')
  let chatTextMessage = chatModal.querySelector('.messenger-action__message');
  let chatContainer = chatModal.querySelector('.messenger-chat__messages');
  let testvar = chatModal.querySelector('.messenger-chat');
  let chatMessageWrapper = chatModal.querySelectorAll('.messenger-chat__message-wrapper');
  let chatUserLastMessage = chatModal.querySelector('.chat-users__message-value');




  let messageText = chatTextMessage.value.trim();
  let finalMessage;
  if (messageText !== '') {
    let messageWrapper = document.createElement('div');
    let messageContent = document.createElement('p');
    let sentContent = document.createElement('p');

    messageWrapper.classList.add('messenger-chat__message-wrapper');
    messageContent.classList.add('messenger-chat__message');
    sentContent.classList.add('messenger-chat__sent', 'text-caption');

    messageContent.textContent = chatTextMessage.value;
    sentContent.textContent = 'Sent';

    messageWrapper.appendChild(messageContent);
    messageWrapper.appendChild(sentContent);
    chatContainer.appendChild(messageWrapper);
    finalMessage = messageText;
    if (testvar.scrollHeight >= 668) {
      testvar.scrollTop = testvar.scrollHeight;
    }

    chatTextMessage.value = '';
  } else if (actionPreviewImageTextValue !== '' || actionPreviewVideoTextValue !== '') {
    let messageWrapper;

    if (actionPreviewImageTextValue !== '' && typeof actionPreviewImageTextValue !== 'undefined') {
      messageWrapper = document.createElement('div');
      var imageElement = document.createElement('img');
      let messageImage = document.createElement('p');
      let sentContent = document.createElement('p');

      imageElement.src = 'content/icons/fileImageWhiteUploadChat-logo.svg';
      messageWrapper.classList.add('messenger-chat__message-wrapper');
      messageImage.classList.add('messenger-chat__message', 'fileMessage');
      sentContent.classList.add('text-caption', 'messenger-chat__sent');

      messageImage.textContent = actionPreviewImageTextValue;
      sentContent.textContent = 'Sent';

      messageImage.appendChild(imageElement);
      messageWrapper.appendChild(messageImage);
      messageWrapper.appendChild(sentContent);
      chatContainer.appendChild(messageWrapper);
      finalMessage = actionPreviewImageTextValue;
      actionImageInput.forEach(function (input) {
        input.value = '';
      });
      actionPreviewImageTextValue = '';
      actionPreviewImageWrapper.forEach(function (wrapper) {
        wrapper.style.display = 'none';
      });
    }

    if (actionPreviewVideoTextValue !== '' && typeof actionPreviewVideoTextValue !== 'undefined') {
      messageWrapper = document.createElement('div');
      var videoElement = document.createElement('img');
      let messageVideo = document.createElement('p');
      let sentContent = document.createElement('p');

      videoElement.src = 'content/icons/fileVideoWhiteUploadChat-logo.svg';
      messageWrapper.classList.add('messenger-chat__message-wrapper');
      messageVideo.classList.add('messenger-chat__message', 'fileMessage');
      sentContent.classList.add('text-caption', 'messenger-chat__sent');

      messageVideo.textContent = actionPreviewVideoTextValue;
      sentContent.textContent = 'Sent';

      messageVideo.appendChild(videoElement);
      messageWrapper.appendChild(messageVideo);
      messageWrapper.appendChild(sentContent);
      chatContainer.appendChild(messageWrapper);
      finalMessage = actionPreviewVideoTextValue;
      actionVideoInput.forEach(function (input) {
        input.value = '';
      });
      actionPreviewVideoTextValue = ''
      actionPreviewVideoWrapper.forEach(function (wrapper) {
        wrapper.style.display = 'none';
      });

    }

    chatContainer.appendChild(messageWrapper);
  }

  if (chatMessageWrapper.length > 0) {
    let lastSentMessage = chatMessageWrapper[chatMessageWrapper.length - 1];
    lastSentMessage.classList.add('sent');
  }

  if (testvar.scrollHeight >= 668) {
    testvar.scrollTop = testvar.scrollHeight;
  }
  updateLastMessage(chatId, finalMessage);
}

function openChatModal(chatId, mic) {
  let chatModalWindow = document.querySelector('.chat-call__modal')
  chatModalWindow.style.display = 'block';
  getChatCopy(chatId, chatModalWindow);
  let videoCamBtn = chatModalWindow.querySelector('.chat-call__videocam-btn')
  if (typeof mic != 'undefined'){
    videoCamBtn.classList.remove('video-active')
  }
  console.log(mic)
}

function closeChatModal() {
  let chatModalWindow = document.querySelector('.chat-call__modal')
  chatModalWindow.style.display = 'none';
  let chatModalChat = chatModalWindow.querySelector('.chat-call__messages');
  chatModalChat.innerHTML = ' ';


}


function getChatCopy(chatId, modal) {
  let chat = document.getElementById(chatId);

  let originalChat = chat.querySelector('.messenger-chat');
  let originalAction = chat.querySelector('.messenger-action');

  let clonedChat = originalChat.cloneNode(true);
  let clonedAction = originalAction.cloneNode(true);

  let destinationChat = modal.querySelector('.chat-call__messages');
  let destinationAction = modal.querySelector('.chat-call__messages');
  destinationChat.appendChild(clonedChat);
  destinationAction.appendChild(clonedAction);

  let sendBtn = modal.querySelector('.messenger-action__send-button');
  sendBtn.removeAttribute('onclick');
  sendBtn.addEventListener('click', function () {
    sendMessageModal(chatId);
  });



}



let videoBtn = document.querySelector('.chat-call__videocam-btn');

videoBtn.addEventListener('click', function () {
  if (this.classList.contains('video-active')) {
    this.classList.remove('video-active')
  } else {
    this.classList.add('video-active')
  }
})
let micBtn = document.querySelector('.chat-call__mic-btn');

micBtn.addEventListener('click', function () {
  if (this.classList.contains('mic-active')) {
    this.classList.remove('mic-active')
  } else {
    this.classList.add('mic-active')
  }
})

const fileWrapper = document.querySelectorAll('.messenger-action__file-wrapper');
const fileBtn = document.querySelectorAll('.messenger-action__file-btn');

// Обработчик клика по кнопке
const handleButtonClick = () => {
  fileWrapper.forEach(wrapper => wrapper.classList.add('active'));
};

// Обработчик клика в любое другое место на странице
const handleDocumentClick = (event) => {
  // Проверяем, был ли клик на кнопке или внутри fileWrapper
  fileWrapper.forEach(wrapper => {
    if (event.target !== fileBtn && !wrapper.contains(event.target)) {
      wrapper.classList.remove('active');
    }
  });
};

// Добавляем обработчик клика по кнопке
fileBtn.forEach(btn => btn.addEventListener('click', handleButtonClick));

// Добавляем обработчик клика в любое другое место на странице
document.addEventListener('click', handleDocumentClick);

