import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
    email: string;
    subject: string;
    content: string;
};

export default function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            subject: "support",
            content: ""
        }
    });

    const inputStyle = {
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: "8px",
        boxSizing: "border-box" as const,
    };

    const onSubmit = async (data: FormData) => {
        console.log(data);
        try {
            const response = await fetch("http://localhost:8080/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
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
            style={{
                maxWidth: 1500,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "center"
            }}
        >
            <label>
                Email :
                <input
                    type="email"
                    {...register("email", { required: "L'email est requis" })}
                    style={inputStyle}
                />
                {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
            </label>
            <label>
                Objet :
                <select
                    {...register("subject", { required: "L'objet est requis" })}
                    style={inputStyle}
                >
                    <option value="support">Support</option>
                    <option value="feedback">Retour</option>
                    <option value="other">Autre</option>
                </select>
                {errors.subject && <span style={{ color: "red" }}>{errors.subject.message}</span>}
            </label>
            <label>
                Message :
                <textarea
                    {...register("content", {
                        required: "Le message est requis",
                        minLength: { value: 20, message: "Minimum 20 caractères" }
                    })}
                    rows={24}
                    style={{ ...inputStyle, width: "100vw", maxWidth: 1500 }}
                />
                {errors.content && <span style={{ color: "red" }}>{errors.content.message}</span>}
            </label>
            <button
                type="submit"
                style={{ border: "2px solid #007bff", borderRadius: 4, maxWidth: "300px" }}
            >
                Envoyer
            </button>
        </form>
    );
}