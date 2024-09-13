import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export const getLocalStorage = () => {
  return inject(DOCUMENT).defaultView?.localStorage;
};

export const getWindow = () => {
  return inject(DOCUMENT).defaultView;
};
