import { Buffer } from 'buffer';

function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
}

function btoa(str) {
  return Buffer.from(str, 'binary').toString('base64');
}

export function encrypt(data) {
  const dataStr = JSON.stringify(data);
  const abc = 'asdfghjklpoiuytrewqzxcvbnm123456789QWERTYUIOPLKJHGFDSAZXCVBNM';
  let str = '';
  while (str.length < 12) {
    str += abc[Math.floor(Math.random() * abc.length)];
  }
  return btoa(str.slice(0, 5) + btoa(dataStr) + str.slice(5));
}

export function decrypt(data) {
  let str = atob(data);
  str = atob(str.slice(5, -7));
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}
