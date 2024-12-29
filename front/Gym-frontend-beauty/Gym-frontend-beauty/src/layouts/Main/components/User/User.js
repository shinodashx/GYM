import { Cookies } from 'react-cookie';

function CheckLoginStatus () {
  return new Cookies().get('gfsessionid') !== undefined && new Cookies().get('gfsessionid') !== '';
}

function Logout () {
  new Cookies().set('gfsessionid', '', { path: '/' });
  localStorage.removeItem('avatar');
  localStorage.removeItem('username');
}

const states = {
  session: CheckLoginStatus(),
  username: getUsername(),
  email: getEmail(),
  avatar: getAvatar(),
  phone: getPhone(),
  sub: getSub(),
  discount: getDiscount(),
  role: null
};

function getAvatar () {
  let avatar = localStorage.getItem('avatar');
  if (avatar === null) {
    avatar = '';
  }
  return avatar;
}

function getSub () {
  let sub = localStorage.getItem('sub');
  if (sub === null) {
    sub = '';
  }
  return sub;
}

function getEmail () {
  let email = localStorage.getItem('email');
  if (email === null) {
    email = '';
  }
  return email;
}

function getPhone () {
  let phone = localStorage.getItem('phone');
  if (phone === null) {
    phone = '';
  }
  return phone;
}

function getUsername () {
  let name = localStorage.getItem('username');
  if (name === null) {
    name = '';
  }
  return name;
}

function getDiscount () {
  let discount = localStorage.getItem('discount');
  if (discount === null) {
    discount = '';
  }
  return discount;
}

function setDiscount (discount) {
  localStorage.setItem('discount', discount);
}

function setAvatar (avatar) {
  localStorage.setItem('avatar', avatar);
}

function setUsername (name) {
  localStorage.setItem('username', name);
}

function setEmail (email) {
  localStorage.setItem('email', email);
}

function setPhone (phone) {
  localStorage.setItem('phone', phone);
}

function setSub (sub) {
  localStorage.setItem('sub', sub);
}


export {
  states,
  CheckLoginStatus,
  Logout,
  setAvatar,
  getAvatar,
  setUsername,
  getUsername,
  setPhone,
  getPhone,
  setEmail,
  getEmail,
  setSub,
  getSub,
  setDiscount,
  getDiscount
};
