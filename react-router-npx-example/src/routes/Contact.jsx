import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import { useState } from "react";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    if (confirmDelete) {
      // Perform the deletion action
      console.log("Delete action executed");
    } else {
      // Show a confirmation dialog or error message
      console.log("Delete action canceled");
    }
  };

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} alt="Contact Avatar" />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form method="post" action="destroy" onSubmit={handleDeleteSubmit}>
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const [favorite, setFavorite] = useState(contact.favorite);

  const handleFavoriteToggle = () => {
    setFavorite(!favorite);
  };

  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        onClick={handleFavoriteToggle}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
