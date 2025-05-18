import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "./ContactCard.css"

const ContactCard = ({ contact }) => {
    // console.log("contact recibido", contact);
    const { dispatch } = useGlobalReducer();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/aivandag/contacts/${contact.id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                dispatch({ type: "delete_contact", payload: contact.id });
            } else {
                console.error("No se pudo eliminar el contacto.");
            }
        } catch (error) {
            console.error("Error al eliminar", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="card-container">
            <div className="contact-row">

                <div className="contact-img text-center">
                    <img
                        src={`https://picsum.photos/seed/${contact.id}/100/100`}
                        className="rounded-circle img-fluid"
                    />
                </div>


                <div className="contact-info">

                    <div className="contact-header">

                        <h5 className="card-tittle">{contact.name}</h5>
                        <div className="contact-action">
                            <Link to={`/edit-contact/${contact.id}`} className="btn btn-outline-secondary">
                                <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >

                                <i className="fas fa-trash"></i>
                                {isDeleting ? "Eliminando" : ""}
                            </button>
                        </div>
                    </div>
                    <p className="card-text">
                        <i className="fas fa-map-marker-alt"></i>{contact.address}
                    </p>
                    <p className="card-text">
                        <i className="fas fa-envelope"></i>{contact.email}
                    </p>
                    <p className="card-text">
                        <i className="fas fa-phone"></i>{contact.phone}
                    </p>

                </div>

            
</div>

        </div>

    );
};



export default ContactCard;