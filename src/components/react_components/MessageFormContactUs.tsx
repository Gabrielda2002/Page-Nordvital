import CustomForm from "@/components/react_components/CustomFormContactUs"


const MessageFormCotactUs = () => {
  return (
    <CustomForm
      showAsunto={true}
      showCV={false}
      showPrivacyPolicy={true}
    />
  );
};

export default MessageFormCotactUs;