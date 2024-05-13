import { useForm } from 'react-hook-form';

function FormService() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nombre del servicio"
          {...register("title")}
          autoFocus
        />
        <textarea rows="3" placeholder="Monto" {...register("Monto")}></textarea>
        <button>Agregar</button>
      </form>
    </div>
  );
}

export default FormService;
