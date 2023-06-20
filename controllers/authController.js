const register = (req, res) => {
  res.send("Register user");
};

const login = (req, res) => {
  res.send("Login user");
};

const logout = (req, res) => {
  res.send("Logout user");
};

module.exports = {
  register,
  login,
  logout,
};
