export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const pass = await bcrypt.compare(password, user.password);

    if (pass) {
      return res.status(200).send({
        success: true,
        message: "Login successful",
        user: user,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Email or password is incorrect",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
