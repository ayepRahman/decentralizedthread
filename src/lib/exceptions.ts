export class AuthRequiredError extends Error {
  constructor(message = "You must be logged in") {
    super(message);
    this.name = "AuthRequiredError";
  }
}
