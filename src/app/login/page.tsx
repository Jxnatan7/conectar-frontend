"use client";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { login as loginService } from "../api/auth";
import BgImage from "@/components/BgImage";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Obrigatório"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const initialValues: LoginFormValues = { email: "", password: "" };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Conectar - Gestão
            </h1>
            <p className="mt-2 text-xl font-semibold text-gray-700">
              Faça seu login para continuar
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const user = await loginService(values.email, values.password);
                login(user);
                router.push(user.role === "MANAGER" ? "/users" : "/profile");
              } catch (err: any) {
                setErrors({ password: "Credenciais inválidas" });
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
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Ainda não tem conta?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Cadastre-se
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="hidden md:block flex-1 h-screen">
        <BgImage />
      </div>
    </div>
  );
}
