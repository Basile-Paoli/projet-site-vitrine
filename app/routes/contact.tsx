import { useForm } from "react-hook-form";
import { buttonStyle, inputStyle } from "~/styles";

type FormData = {
  email: string;
  subject: string;
  content: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      subject: "support",
      content: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:8080/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l’envoi du formulaire");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto flex flex-col gap-4 items-center px-8"
    >
      <label>
        Email :
        <input
          type="email"
          {...register("email", { required: "L'email est requis" })}
          className={inputStyle}
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
      </label>
      <label>
        Objet :
        <select
          {...register("subject", { required: "L'objet est requis" })}
          className={inputStyle}
        >
          <option value="support">Support</option>
          <option value="feedback">Retour</option>
          <option value="other">Autre</option>
        </select>
        {errors.subject && (
          <span className="text-red-600">{errors.subject.message}</span>
        )}
      </label>
      <label className="w-full max-w-[800px]">
        Message :
        <textarea
          {...register("content", {
            required: "Le message est requis",
            minLength: { value: 20, message: "Minimum 20 caractères" },
          })}
          rows={24}
          className={inputStyle}
        />
        {errors.content && (
          <span className="text-red-600">{errors.content.message}</span>
        )}
      </label>
      <button
        type="submit"
        className={buttonStyle}
      >
        Envoyer
      </button>
    </form>
  );
}
