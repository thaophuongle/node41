export const response = (res, data, message, status_code) => {
  res.json({
    statusCode: status_code,
    data: data,
    message: message,
    date: new Date(),
  });
};
