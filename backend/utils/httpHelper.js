const httpHelper = (() => {

  const success = (response, data, message) => {
    response.send({
      isSucess: true,
      data: data,
      message: message || "Success"
    })
  }

  const error = (response, data, message) => {
    response.status(400).send({
      isSucess: false,
      data: data,
      message: message || "Error in DB. Please contact administrator."
    })
  }

  const unauthorized = (response, data, status) => {
    response.status(status || 500).send({
      isSucess: false,
      data: data,
      message: "Unauthorized"
    })
  }

  return {
    success: success,
    error: error,
    unauthorized: unauthorized
  }
})();

export default httpHelper;