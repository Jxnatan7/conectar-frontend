"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/app/api/types";
import { deleteUser, getUserById } from "@/app/api/users";
import { Button } from "@/components/Button";

export default function UserDetailPage() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        if (id) {
          const data = await getUserById(id);
          setUserDetail(data);
        }
      } catch (err: any) {
        setError("Falha ao carregar detalhes.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (confirm("Tem certeza que deseja remover este usuário?")) {
      await deleteUser(id);
      router.push("/users");
    }
  };

  if (loading) return <p className="text-center mt-8">Carregando...</p>;
  if (error || !userDetail)
    return (
      <p className="text-center mt-8 text-red-600">
        {error || "Usuário não encontrado."}
      </p>
    );

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-xl font-bold mb-4">Detalhes de Usuário</h2>
      <p>
        <strong>ID:</strong> {userDetail.id}
      </p>
      <p>
        <strong>Nome:</strong> {userDetail.name}
      </p>
      <p>
        <strong>Email:</strong> {userDetail.email}
      </p>
      <p>
        <strong>Role:</strong> {userDetail.role}
      </p>
      <p>
        <strong>Criado em:</strong>{" "}
        {new Date(userDetail.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Atualizado em:</strong>{" "}
        {new Date(userDetail.updatedAt).toLocaleString()}
      </p>
      <div className="mt-6 flex space-x-4">
        <Button onClick={() => router.push("/users")}>Voltar</Button>
        <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
          Deletar
        </Button>
      </div>
    </div>
  );
}
