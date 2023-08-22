import User from "../models/User.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("auth/signup");

export const signup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;


  if (name.length <= 0) {
    errors.push({ text: 'Por favor ingresa un nombre' });
  }
  if (email.length <= 0) {
    errors.push({ text: 'Por favor ingresa un correo' });
  }


  if (password !== confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden." });
  }

  if (password.length < 4) {
    errors.push({ text: "La contraseña debe ser mayor a 4 caracteres." });
  }

  if (errors.length > 0) {
    return res.render("auth/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  // Look for email coincidence....
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "El correo electrónico ya está en uso.");
    return res.redirect("/auth/signup");
  }

  // Saving a New User....
  const newUser = new User({ name, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash("success_msg", "Estás registrado.");
  res.redirect("/auth/signin");
};

export const renderSigninForm = (req, res) => res.render("auth/signin");

// GRAFICAS D
export const signin = passport.authenticate("local", {
  successRedirect: "/visor",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Estás desconectado ahora.");
    res.redirect("/auth/signin");
  });
};
