// src/app/users/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { User, UpdateUserDto, UserRole } from "@/app/api/types";
import { getUserById, updateUser, deleteUser } from "@/app/api/users";
import { Header } from "@/components/Header";

interface FormValues {
  name: string;
  email: string;
  role: UserRole;
}

const EditSchema = yup.object().shape({
  name: yup.string().required("Obrigatório"),
  email: yup.string().email("Email inválido").required("Obrigatório"),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole) as UserRole[], "Role inválido")
    .required("Obrigatório"),
});

export default function UserEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getUserById(id)
      .then((u: User) => {
        setInitialValues({
          name: u.name,
          email: u.email,
          role: u.role,
        });
      })
      .catch(() => setError("Falha ao carregar detalhes."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (confirm("Tem certeza que deseja remover este usuário?")) {
      await deleteUser(id);
      router.push("/users");
    }
  };

  if (loading || !initialValues) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700">{error ? error : "Carregando..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Editar Usuário" showBack={true} />

      <main className="flex-1 p-6">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <Formik
            initialValues={initialValues}
            validationSchema={EditSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const payload: UpdateUserDto = {
                  name: values.name,
                  email: values.email,
                  role: values.role,
                };
                await updateUser(id!, payload);
                router.push("/users");
              } catch (err: any) {
                setErrors({ email: "Erro ao salvar. Tente novamente." });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <Form className="space-y-6">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Nome"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name ? errors.name : ""}
                />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : ""}
                />

                <div className="flex flex-col">
                  <label
                    htmlFor="role"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Papel
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full text-gray-900 rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value={UserRole.USER}>USER</option>
                    <option value={UserRole.MANAGER}>MANAGER</option>
                  </select>
                  {touched.role && errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                  )}
                </div>

                <div className="flex justify-between space-x-4">
                  <Button
                    onClick={handleDelete}
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md"
                  >
                    Deletar
                  </Button>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      onClick={() => router.back()}
                      className="bg-[#ffcde7] hover:bg-[#ff8c96] text-gray-700 px-2 py-2 rounded-md"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#FFADD8] hover:bg-[#ff8cc7] text-white px-2 py-2 rounded-md"
                    >
                      {isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
