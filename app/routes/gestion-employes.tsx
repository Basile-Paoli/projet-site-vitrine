import { useEffect, useState } from 'react';
import type { Employee } from '../../types/Employee';

let mockEmployees: Employee[] = [
	{ id: 1, name: 'Alice', role: 'Employe' },
	{ id: 2, name: 'Bob', role: 'Employe' },
	{ id: 3, name: 'Charlie', role: 'Employe' },
];

const getEmployees = (): Employee[] => {
	return [...mockEmployees];
};

const addEmployee = (employee: { name: string; role: string }) => {
	const newId = mockEmployees.length > 0 ? Math.max(...mockEmployees.map(e => e.id)) + 1 : 1;
	const newEmployee = { id: newId, name: employee.name, role: employee.role };
	mockEmployees.push(newEmployee);
	return newEmployee;
};

const deleteEmployee = (id: number) => {
	mockEmployees = mockEmployees.filter(e => e.id !== id);
	return true;
};

const EmployeeManagement = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [form, setForm] = useState({ name: '', role: '' });

	useEffect(() => {
		refreshEmployees();
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

	const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (form.name && form.role) {
			addEmployee({ ...form });
			setForm({ name: '', role: '' });
			refreshEmployees();
		}
	};

	const handleDelete = (id: number) => {
		deleteEmployee(id);
		refreshEmployees();
	};

	return (
		<div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 text-black">
			<h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
				Gestion des employés
			</h2>
			<div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-xl mb-8">
				<form onSubmit={handleAdd} className="flex flex-col gap-4">
					<input
						className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="text"
						name="name"
						placeholder="Nom"
						value={form.name}
						onChange={handleChange}
					/>
					<input
						className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="text"
						name="role"
						placeholder="Rôle"
						value={form.role}
						onChange={handleChange}
					/>
					<button className="py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer" type="submit">
						Ajouter
					</button>
				</form>
			</div>
			<div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-xl">
				<ul className="space-y-4">
					{(employees ?? []).map(emp => (
						<li key={emp.id} className="flex items-center justify-between p-4 border border-gray-200 rounded">
							<span className="font-medium">{emp.name} - {emp.role ?? ''}</span>
							<button 
								className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
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
