import { useState } from "react";

const initialFormState = {
  categoria: "",
  marca: "",
  modelo: "",
  descripcion: "",
  anio: "",
  kilometraje: "",
  precio: "",
  combustible: "",
  foto: "",
};

const getFormState = (vehiculo) => ({
  ...initialFormState,
  ...(vehiculo || {}),
});

function VehiculoForm({ onCreateVehiculo, onUpdateVehiculo, vehiculo, isSaving }) {
  const [form, setForm] = useState(() => getFormState(vehiculo));

  const isEditing = Boolean(vehiculo);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({
      ...form,
      [name]: type == "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.categoria.trim()) {
      alert("Por favor, Seleccione una categoría.");
      return;
    }
    if (!form.marca.trim()) {
      alert("Por favor, Ingrese una marca.");
      return;
    }
    if (!form.modelo.trim()) {
      alert("Por favor, Ingrese un modelo.");
      return;
    }
    if (!form.anio.trim()) {
      alert("Por favor, Ingrese un año.");
      return;
    }
    if (!form.kilometraje.trim()) {
      alert("Por favor, Ingrese un kilometraje.");
      return;
    }
    if (!form.precio.trim()) {
      alert("Por favor, Ingrese un precio.");
      return;
    }
    if (!form.combustible.trim()) {
      alert("Por favor, Seleccione un tipo de combustible.");
      return;
    }
    if (!form.foto.trim()) {
      alert("Por favor, Ingrese una URL de foto.");
      return;
    }
    try {
      if (isEditing) {
        await onUpdateVehiculo(vehiculo._id, form);
      } else {
        await onCreateVehiculo(form);
      }
      setForm(initialFormState);
    } catch (error) {
      alert(error.message || "No se pudo guardar el vehículo.");
    }
  };

  return (
    <form className="vehiculo-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar vehículo" : "Agregar nuevo vehículo"}</h2>
      <div className="form-group">
        <label htmlFor="categoria">Categoría:</label>
        <select
          id="categoria"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          <option value="Sedán">Sedán</option>
          <option value="SUV">SUV</option>
          <option value="Camioneta">Camioneta</option>
          <option value="Deportivo">Deportivo</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="marca">Marca:</label>
        <input
          type="text"
          placeholder="Ingrese la marca"
          id="marca"
          name="marca"
          value={form.marca}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="modelo">Modelo:</label>
        <input
          type="text"
          placeholder="Ingrese el modelo"
          id="modelo"
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          placeholder="Ingrese la descripción"
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="anio">Año:</label>
        <input
          type="number"
          placeholder="Ingrese el año"
          id="anio"
          name="anio"
          value={form.anio}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="kilometraje">Kilometraje:</label>
        <input
          type="number"
          placeholder="Ingrese el kilometraje"
          id="kilometraje"
          name="kilometraje"
          value={form.kilometraje}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          placeholder="Ingrese el precio"
          id="precio"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="combustible">Combustible:</label>
        <select
          id="combustible"
          name="combustible"
          value={form.combustible}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un tipo de combustible</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Diésel">Diésel</option>
          <option value="Eléctrico">Eléctrico</option>
          <option value="Híbrido">Híbrido</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="foto">Foto:</label>
        <input
          type="text"
          id="foto"
          name="foto"
          value={form.foto}
          onChange={handleChange}
          placeholder="HTTPS://"
          required
        />
      </div>
      <button type="submit" disabled={isSaving}>
        {isSaving ? "Guardando..." : isEditing ? "Actualizar vehículo" : "Agregar vehículo"}
      </button>
    </form>
  );
}

export default VehiculoForm;
