import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate, useParams } from "react-router-dom"



const AddContact = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();


    const [form, setform] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        agenda_slug: "aivandag",
    });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/aivandag/contacts");
                if (response.ok) {
                    const data = await response.json();
                    setform(data);
                } else {
                    console.error("No se pudo cargar el contacto.");
                }
            } catch (error) {
                console.error("Error al buscar el contacto", error);
            }
        };

        if (id) fetchContact();
    }, [id]);


    const handleChange = (event) => {
        setform({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = id
            ? `https://playground.4geeks.com/contact/${id}`
            : "https://playground.4geeks.com/contact/agendas/aivandag/contacts"

        const method = id ? "PUT" : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({
                    type: id ? "update_contact" : "add_contact",
                    payload: data

                });

                alert(id ? "Contacto actualizado" : "Agregaste un nuevo contacto exitosamente.");
                navigate("/");

            } else {
                alert("No se creo el contacto");
            }
        } catch (error) {
            console.error("error al crear el contacto, error");
        }
    };

    return (
        <div className="container mt-4">
            <div className="text-center" >
                <h2> {id ? "Editar" : "Add new Contact"} </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label className="form-label"> Full Name</label>
                <input className="form-control "
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <label className="form-label pt-2"> Email</label>
                <input className="form-control "
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <label className="form-label pt-2"> Phone</label>
                <input className="form-control "
                    type="text"
                    name="phone"
                    placeholder="Enter phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                <label className="form-label pt-2"> Address</label>
                <input className="form-control "
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary w-100">
                        {id ? "Guardar cambios" : "Save"}
                    </button>
                    <Link to="/" className=" text-decoration-none">Or get back to contacts</Link>
                </div>
            </form>

        </div>
    );
};

export default AddContact;