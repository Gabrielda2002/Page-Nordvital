import CustomForm from "@/components/react_components/FormT"


const NomForm = () => {
  return (
    <CustomForm
      showAsunto={true}
      showCV={false}
      emailTemplate="template_t3y5utq"
      serviceId="service_i4i8je4"
      publicKey="EU9Av1Gcbfi0qIVJC"
      targetEmail="info@nordvitalips.com"
      buttonText="Enviar"
      showPrivacyPolicy={true}
    />
  );
};

export default NomForm;