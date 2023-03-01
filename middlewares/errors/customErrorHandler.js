import CustomError from "../../helpers/error/CustomError.js";

const customErrorHandler = (err, req, res, next) => {
  let customError = err;

  if(err.name ==="SyntaxError"){
    customError = new CustomError("Unexpected Syntax", 400)
  }

  if(err.name ==="ValidationError"){
    customError = new CustomError(err.message, 400)
  }

  if(err.code ===11000){
    customError = new CustomError("Already registered with this email", 400)
  }

  if(err.name === "CastError"){
    customError = new CustomError("Please provide a valid id",400)
  }

  if(err.message ==="User validation failed: email: Please provide a valid email" ){
    customError = new CustomError("Please provide a valid email")
  }
  
  console.log(customError.message, customError.status);
  
  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "Internal Server Error"
  });
};

export default customErrorHandler;