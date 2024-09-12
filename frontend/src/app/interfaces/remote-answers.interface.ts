
export interface RemoteAnswers {
  //If the request was successful, success will be true and data will contain the response.
  success: boolean;
  data: string;
  //If the request was unsuccessful, success will be false and errors will contain the error messages.
  errors?: RemoteErrors;
}
export interface RemoteErrors {
  //The key will be the name of the form control and the value will be the error message.
  [keyof: string]: string;
}

