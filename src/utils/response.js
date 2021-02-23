export default class Response {
  static success(message, statusCode, status, res) {
    res.status(statusCode).json({
      message,
      status,
    });
  }

  static generic(statusCode, message, status, data, res) {
    res.status(statusCode).json({
      message,
      status,
      data,
    });
  }

  static subscriptionResponse(statusCode, topic, url, res) {
    res.status(statusCode).json({
      topic,
      url,
    });
  }
  
  static error(statusCode, status, message, res) {
    res.status(statusCode).json({
      message,
      status,
    });
  }
}
