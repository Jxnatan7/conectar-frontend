"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { getUserById, updateUser } from "@/app/api/users";
import { UpdateUserDto, UserRole, User } from "@/app/api/types";
import { Header } from "@/components/Header";

interface FormValues {
  name: string;
  email: string;
  role: UserRole;
}

const ProfileSchema = yup.object().shape({
  name: yup.string().required("Obrigatório"),
  email: yup.string().email("Email inválido").required("Obrigatório"),
});

export default function ProfilePage() {
  const { user, updateUser: updateContextUser, logout } = useAuth();
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }
      try {
        const data: User = await getUserById(user.id);
        setInitialValues({
          name: data.name,
          email: data.email,
          role: data.role,
        });
      } catch {
        setError("Falha ao carregar perfil.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  if (loading || !initialValues) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700">{error || "Carregando perfil..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Meu Perfil" showBack={user?.role === "MANAGER"} />
      <main className="flex-1 p-6">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const payload: UpdateUserDto = {
                  name: values.name,
                  email: values.email,
                  role: user.role,
                };
                const updated = await updateUser(user.id, payload);
                updateContextUser(updated);
              } catch (err: any) {
                setErrors({ email: "Erro ao atualizar. Tente novamente." });
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

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => logout()}
                    className="bg-[#ffcde7] hover:bg-[#ff8c96] text-gray-700 px-2 py-2 rounded-md"
                  >
                    Logout
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FFADD8] hover:bg-[#ff8cc7] text-white px-2 py-2 rounded-md"
                  >
                    {isSubmitting ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
