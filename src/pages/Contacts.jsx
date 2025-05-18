import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom"

const Contacts = () => {
    const { dispatch, store } = useGlobalReducer()

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/aivandag")
                if (response.ok) {
                    const data = await response.json();
                    console.log(" Contactos recibidos:", data.contacts);
                    dispatch({ type: "load_contacts", payload: data.contacts });
                } else {
                    console.error("no se pudo cargar la lista de contactos.");
                }
            } catch (error) {
                console.error("Error al obtener los contactos", error);
            }
        };

        fetchContacts();
    }, []);

    return (<div className="container">
     
   <div className="container-newcontact">
            <Link to="/add-contact" className="btn btn-success">
                Add new contact
            </Link>
        </div>

        <div className="contacts-list">
            {store.contacts.length > 0 ? (
                store.contacts.map((contact) => (
                    <div className="col-12" key={contact.id}>
                        <ContactCard contact={contact} />
                    </div>
                ))

            ) : (
                <div className="text-center mt-5">
                    <p> No hay contactos disponibles.</p>
                </div>
            )}
        </div>
        <div className="text-center mt-5">
            {/* <img src="https://picsum.photos/id/237/200/300" /> */}

        </div>
    </div >
    );
};

export default Contacts;