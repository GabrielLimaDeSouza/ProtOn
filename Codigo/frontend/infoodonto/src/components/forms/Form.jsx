import { useRef } from "react";

// eslint-disable-next-line react/prop-types
const Form = ({ onSubmit, children }) => {
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(new FormData(form.current));
  };

  return (
    <form
      ref={form}
      className="form-component flex flex-column row-gap-3rem"
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
