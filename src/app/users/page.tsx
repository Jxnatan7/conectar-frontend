// src/app/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, UserRole, FilterQuery } from "@/app/api/types";
import { listUsers, deleteUser } from "@/app/api/users";
import { Button } from "@/components/Button";
import { Edit, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterRole, setFilterRole] = useState<string>("");
  const [sortBy, setSortBy] = useState<FilterQuery["sort"]>("name");
  const [order, setOrder] = useState<FilterQuery["order"]>("ASC");

  const router = useRouter();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const query: FilterQuery = {
        page: 1,
        limit: 100,
        sort: sortBy,
        order,
      };
      if (filterRole) query.role = filterRole as UserRole;

      const { data } = await listUsers(query);
      setUsers(data);
    } catch (err: any) {
      setError("Falha ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filterRole, sortBy, order]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Usuários" showBack={false} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="rounded-md text-gray-900 border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Todos os papéis</option>
                <option value={UserRole.USER}>USER</option>
                <option value={UserRole.MANAGER}>MANAGER</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as FilterQuery["sort"])
                }
                className="rounded-md text-gray-900 border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="name">Nome</option>
                <option value="createdAt">Criado em</option>
              </select>
              <select
                value={order}
                onChange={(e) =>
                  setOrder(e.target.value as FilterQuery["order"])
                }
                className="rounded-md text-gray-900 border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="ASC">Ascendente</option>
                <option value="DESC">Descendente</option>
              </select>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => router.push("/users/create")}
                className="bg-[#FFADD8] hover:bg-[#ff8cc7] text-white px-4 py-2 rounded-md"
              >
                + Novo Usuário
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((u, idx) => (
                  <tr
                    key={u.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {u.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {u.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {u.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => router.push(`/users/${u.id}`)}
                        className="p-1 rounded hover:bg-gray-100"
                        aria-label="Detalhes"
                      >
                        <Edit size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={async () => {
                          await deleteUser(u.id);
                          fetchUsers();
                        }}
                        className="p-1 rounded hover:bg-gray-100"
                        aria-label="Excluir"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
