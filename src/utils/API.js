class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
    this._headers = {
      authorization: 'bfc6d56e-7e9e-491a-a278-c2e6d08bdc0b',
      'Content-Type': 'application/json'
    };

  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получение карточек с сервера

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  // Отправка карточек на сервер

  setInitialCards(name, link) {
    const cardBody = {
      name: name,
      link: link
    }
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardBody)
    })
      .then(this._checkResponse);
  }

  // Загрузка информации о пользователе с сервера

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  // Загрузка информации о пользователе на сервер

  setInfo(data) {
    const userInfoBody = {
      name: data.name,
      about: data.about,
    }
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userInfoBody)
    })
      .then(this._checkResponse);
  }

  setAvatar(data) {
    const userAvatarBody = {
      avatar: data.avatar,
    }
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userAvatarBody)
    })
      .then(this._checkResponse);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});