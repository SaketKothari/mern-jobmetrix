export const authenticateUser = async (req, resizeBy, next) => {
  console.log('auth middleware');
  next();
};
