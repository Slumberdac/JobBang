// Here's how to make T as a inferable type
type InferRemoteAnswers<T> = T extends RemoteAnswers<infer U> ? U : never;


export interface RemoteAnswers<T> {
  //If the request was successful, success will be true and data will contain the response.
  success: boolean;
  data?: T;
  //If the request was unsuccessful, success will be false and errors will contain the error messages.
  errors?: RemoteErrors;
}
export interface RemoteErrors {
  //The key will be the name of the form control and the value will be the error message.
  [keyof: string]: string;
}
