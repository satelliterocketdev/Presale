const TERMS_ACCEPTED_KEY = 'joystickdao.terms.accepted';
const WHITELIST_KEY = 'joystickdao.whitelisted';

export const getLocalStorageIsTermsAccepted = () => {
  const acceptedString = localStorage.getItem(TERMS_ACCEPTED_KEY);
  return acceptedString === 'true';
};

export const setLocalStorageIsTermsAccepted = (accepted: boolean) => {
  if (accepted) {
    localStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
  } else {
    localStorage.removeItem(TERMS_ACCEPTED_KEY);
  }
};

export const getLocalStorageIsWhitelisted = () => {
  return localStorage.getItem(WHITELIST_KEY) === 'true';
};

export const setLocalStorageIsWhitelisted = (whitelisted: boolean) => {
  if (whitelisted) {
    localStorage.setItem(WHITELIST_KEY, 'true');
  } else {
    localStorage.removeItem(WHITELIST_KEY);
  }
};
