import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config.server';
import { ApplicationRef } from '@angular/core';

const bootstrap = async (): Promise<ApplicationRef> => {
  try {
    return await bootstrapApplication(AppComponent, appConfig);
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to ensure the return type is always Promise<ApplicationRef>
  }
};
export default bootstrap;
