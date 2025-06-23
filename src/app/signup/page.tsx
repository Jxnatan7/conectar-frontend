"use client";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { register as registerService } from "../api/auth";
import { FormContainer } from "@/components/FormContainer";
import { UserRole } from "../api/types";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

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
  const router = useRouter();

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <FormContainer title="Cadastrar-se">
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerService({ ...values, role: UserRole.USER });
            router.push("/login");
          } catch (err: any) {
            setErrors({ email: "Erro ao cadastrar. Talvez email já exista." });
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
