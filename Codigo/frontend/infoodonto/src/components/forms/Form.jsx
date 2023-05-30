import { useRef } from "react";

// eslint-disable-next-line react/prop-types
const Form = ({ className, onSubmit, children }) => {
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(new FormData(form.current));
  };

  return (
    <form ref={form} className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
