"use client";

import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { CreateUserDto, UserRole } from "@/app/api/types";
import { createUser } from "@/app/api/users";
import { Header } from "@/components/Header";

interface CreateFormValues {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const CreateSchema = yup.object().shape({
  name: yup.string().required("Obrigatório"),
  email: yup.string().email("Email inválido").required("Obrigatório"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole) as UserRole[], "Role inválido")
    .required("Obrigatório"),
});

export default function CreateUserPage() {
  const router = useRouter();

  const initialValues: CreateFormValues = {
    name: "",
    email: "",
    password: "",
    role: UserRole.USER,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Novo usuário" showBack />

      <main className="flex-1 p-6">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <Formik
            initialValues={initialValues}
            validationSchema={CreateSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const payload: CreateUserDto = {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  role: values.role,
                };
                await createUser(payload);
                router.push("/users");
              } catch (err: any) {
                setErrors({ email: "Erro ao criar usuário. Tente novamente." });
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

                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="Senha"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password ? errors.password : ""}
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

                <div className="flex justify-end space-x-4">
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
