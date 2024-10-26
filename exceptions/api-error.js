export default class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User not authorized');
  }

  static NotFoundError() {
    return new ApiError(404, 'Not Found');
  }

  static BadRequerest(message) {
    return new ApiError(400, message);
  }
}
