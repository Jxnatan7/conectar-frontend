import Image from "next/image";

export default function BgImage() {
  return (
    <Image
      src={require("../assets/login-image.svg")}
      alt="Ilustração de boas-vindas"
      className="object-cover"
      style={{
        height: "100%",
      }}
    />
  );
}
