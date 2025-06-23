"use client";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useAuth } from "@/contexts/AuthContext";
import { FormContainer } from "@/components/FormContainer";
import { login as loginService } from "../api/auth";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

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
    <FormContainer title="Entrar">
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
          <Form>
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
