import React, { useState } from "react"
import Modal from "react-modal"
import { FaCheck, FaTimes } from "react-icons/fa"
import { VscBook } from "react-icons/vsc"
import { Quotes } from "./quotes"

Modal.setAppElement("#root")

const BookCard = ({ book }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [email, setEmail] = useState("")
  const [quote, setQuote] = useState("")

  const emailRegex =
    /^([A-Za-z\d\._-]+)@([A-Za-z\d-]+)\.([A-Za-z]{2,6})(\.[A-Za-z]{2,6})?$/

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      console.log("thank you")
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (emailRegex.test(e.target.value)) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const handleModalClose = () => {
    setModalIsOpen(false)
    setEmail("")
    setIsValid(false)
  }

  const generateRandomQuote = () => {
    // Math.floor(Math.random() * (max - min + 1)) + min;
    const randomIndex =
      Math.floor(Math.random() * (Quotes.length - 1 - 0 + 1)) + 0
    return Quotes[randomIndex].quote
  }

  return (
    <div className="book">
      <img
        src={book.formats["image/jpeg"]?.replace("small", "medium")}
        alt={book.title}
        className="book-poster"
        onClick={() => {
          setModalIsOpen(true)
          setQuote(generateRandomQuote())
        }}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        preventScroll={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(108, 122, 137, 0.7)",
          },
          content: {
            position: "absolute",
            top: "150px",
            bottom: "150px",
            maxWidth: "700px",
            margin: "0 auto",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: 0,
            boxShadow: "5px 5px 7px #1c1d1f, -5px -5px 7px #222527",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          },
        }}
      >
        <div className="modal-left-section">
          <p className="inspiring-quote">{quote}</p>
          <VscBook size="128px" />
        </div>

        <div className="modal-right-section">
          <h2 className="modal-right-section__header">Drop Your Email</h2>
          <form onSubmit={handleSubmit} className={`${isValid ? "valid" : ""}`}>
            <label htmlFor="email" className="modal-form-label">
              EMAIL ADDRESS
            </label>
            <div className="input-tick-wrap">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="modal-form-input"
                value={email}
                onChange={handleChange}
              />
              <FaCheck className="tick" />
            </div>
            <button type="submit" className="send-btn">
              Send Book
            </button>
          </form>
        </div>

        <FaTimes onClick={handleModalClose} className="close-btn" />
      </Modal>
    </div>
  )
}

export default BookCard

{
  /* <p className="book-year">{book.authors[0]?.name}</p>

<div className="book-info">
  <span className="book-type">{book.media_type}</span>
  <h3 className="book-title">{book.title}</h3>
</div> */
}
