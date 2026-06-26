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
    foto: ""
};

function VehiculoForm() {

    const [ form , setForm ] = useState(initialFormState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    return (
        <form className="vehiculo-form">
            <h2>Agregar nuevo vehículo</h2>
            <div className="form-group">
                <label htmlFor="categoria">Categoría:</label>
                <input type="text" placeholder="Ingrese la categoría" id="categoria" name="categoria" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="marca">Marca:</label>
                <input type="text" placeholder="Ingrese la marca" id="marca" name="marca" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="modelo">Modelo:</label>
                <input type="text" placeholder="Ingrese el modelo" id="modelo" name="modelo" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <input type="text" placeholder="Ingrese la descripción" id="descripcion" name="descripcion" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="anio">Año:</label>
                <input type="number" placeholder="Ingrese el año" id="anio" name="anio" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="kilometraje">Kilometraje:</label>
                <input type="number" placeholder="Ingrese el kilometraje" id="kilometraje" name="kilometraje" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input type="number" placeholder="Ingrese el precio" id="precio" name="precio" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="combustible">Combustible:</label>
                <input type="text" placeholder="Ingrese el tipo de combustible" id="combustible" name="combustible" onChange={handleChange} required />
            </div>
            {form.foto.trim() && (
                <div className="form-group">
                    <img src={form.foto} alt="Vista previa del vehículo" className="vehiculo-preview" />
                </div>
            )}
            <button type="submit">Agregar vehículo</button>
        </form>
    )
}

export default VehiculoForm