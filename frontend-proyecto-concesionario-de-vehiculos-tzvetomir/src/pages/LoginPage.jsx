import { useState } from "react";
import { login } from "../services/authSevices.js";
import { useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.email.trim() || !form.password.trim()) {
      setError("Por favor, complete todos los campos.");
      return false;
    }

    if (!emailRegex.test(form.email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const user = {
        email: form.email.trim(),
        password: form.password,
      };

      const data = await login(user);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage(data.message || "Inicio de sesión exitoso.");

      setForm(initialForm);
      navigate("/admin");
    } catch (error) {
      setError(
        error.message ||
          "Error al iniciar sesión. Por favor, inténtelo de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="login-page">
      <section className="login-form-container">
        <div className="login-form-content">
          <h1>Iniciar Sesión</h1>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <p>Por favor, complete el formulario para iniciar sesión.</p>
          <form className="login-form" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
