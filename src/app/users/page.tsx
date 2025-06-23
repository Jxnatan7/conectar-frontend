"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../api/types";
import { listUsers } from "../api/users";
import { Button } from "@/components/Button";

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const { data } = await listUsers({ page: 1, limit: 100 });
        setUsers(data);
      } catch (err: any) {
        setError("Falha ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-8">Carregando...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Usuários</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left">ID</th>
              <th className="px-6 py-3 border-b text-left">Nome</th>
              <th className="px-6 py-3 border-b text-left">Email</th>
              <th className="px-6 py-3 border-b text-left">Role</th>
              <th className="px-6 py-3 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{u.id}</td>
                <td className="px-6 py-4 border-b">{u.name}</td>
                <td className="px-6 py-4 border-b">{u.email}</td>
                <td className="px-6 py-4 border-b">{u.role}</td>
                <td className="px-6 py-4 border-b text-center">
                  <Button onClick={() => router.push(`/users/${u.id}`)}>
                    Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
