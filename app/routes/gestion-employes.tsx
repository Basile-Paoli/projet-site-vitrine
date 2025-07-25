import { useEffect, useState } from "react";
import type { Employee } from "../../types/Employee";
import { buttonStyle, inputStyle } from "~/styles";

const employeeApiUrl = "http://localhost:8080/employees";

const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(employeeApiUrl);
  if (!response.ok) throw new Error("Erreur lors de la récupération des employés");
  return await response.json() as Employee[];
};

const addEmployee = async (employee: { name: string; role: string }) => {
  const response = await fetch(employeeApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error("Erreur lors de l'ajout de l'employé");
  return await response.json();
};

const deleteEmployee = async (id: number) => {
  const response = await fetch(`${employeeApiUrl}/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({ name: "", role: "" });

  useEffect(() => {
    getEmployees().then(setEmployees).catch(console.error);
  }, []);

  const refreshEmployees = () => {
    const data = getEmployees();
    setEmployees(Array.isArray(data) ? data : []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.name && form.role) {
      await addEmployee({ ...form });
      setForm({ name: "", role: "" });
      getEmployees().then(setEmployees).catch(console.error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    getEmployees().then(setEmployees).catch(console.error);
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4  ">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
        Gestion des employés
      </h2>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-xl mb-8">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <input
            className={inputStyle}
            type="text"
            name="name"
            placeholder="Nom"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className={inputStyle}
            type="text"
            name="role"
            placeholder="Rôle"
            value={form.role}
            onChange={handleChange}
          />
          <button className={buttonStyle} type="submit">
            Ajouter
          </button>
        </form>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-xl">
        <ul className="space-y-4">
          {(employees ?? []).map((emp) => (
            <li
              key={emp.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded"
            >
              <span className="font-medium">
                {emp.name} - {emp.role ?? ""}
              </span>
              <button
                className={buttonStyle + " border-red-500  text-red-500"}
                onClick={() => handleDelete(emp.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeManagement;
