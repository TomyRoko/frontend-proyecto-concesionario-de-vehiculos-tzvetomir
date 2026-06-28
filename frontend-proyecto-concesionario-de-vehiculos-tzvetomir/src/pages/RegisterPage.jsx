import { useState } from "react";
import { register } from "../services/authSevices.js";

const initialForm = {
  username: "",
  email: "",
  email_confirmation: "",
  password: "",
  password_confirmation: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterPage() {
  const [form, setForm] = useState(initialForm);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      setMessage("");
      if (form.password !== form.password_confirmation) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      if (form.email !== form.email_confirmation) {
        setError("Los correos electrónicos no coinciden.");
        return;
      }
      if (!emailRegex.test(form.email)) {
        setError("Por favor, ingrese un correo electrónico válido.");
        return;
      }
      const userData = {
        name: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      };
      const data = await register(userData);
      setMessage(
        data.message ||
          "Usuario registrado correctamente. Por favor, inicie sesión.",
      );
      setForm(initialForm);
    } catch (error) {
      setError(
        error.message ||
          "Error al registrar el usuario. Por favor, inténtelo de nuevo.",
      );
    }
  };

  return (
    <main className="register-page">
      <section className="register-form-container">
        <div className="register-form-content">
          <h1>Registro de Usuario</h1>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <p>Por favor, complete el formulario para crear una cuenta.</p>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email_confirmation">
                Confirmar correo electrónico
              </label>
              <input
                type="email"
                id="email_confirmation"
                name="email_confirmation"
                value={form.email_confirmation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation">
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="register-button">
              Registrarse
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
