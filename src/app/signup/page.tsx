"use client";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { register as registerService } from "../api/auth";
import { UserRole } from "../api/types";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import BgImage from "@/components/BgImage";
import { useAuth } from "@/contexts/AuthContext";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterSchema = yup.object().shape({
  name: yup.string().required("Obrigatório"),
  email: yup.string().email("Email inválido").required("Obrigatório"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
});

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block flex-1 h-screen relative">
        <BgImage />
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cadastre-se</h1>
            <p className="mt-2 text-xl font-semibold text-gray-700">
              Crie sua conta para começar
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const user = await registerService({
                  ...values,
                  role: UserRole.USER,
                });
                register(user);
                router.push("/login");
              } catch (err: any) {
                setErrors({
                  email: "Erro ao cadastrar. Talvez email já exista.",
                });
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
              <Form className="mt-8 space-y-6">
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Já tem conta?{" "}
                  <a
                    href="/login"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Entrar
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
