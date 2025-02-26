// Valores por defecto para desarrollo
 const config = {
  PUBLIC_BACKEND_URL: import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:3000",
  PUBLIC_TARGET_EMAIL: import.meta.env.PUBLIC_TARGET_EMAIL || "test@example.com",
  PUBLIC_EMAILJS_SERVICE_ID: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || "service_id",
  PUBLIC_EMAILJS_TEMPLATE_ID: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || "template_id",
  PUBLIC_EMAILJS_PUBLIC_KEY: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || "public_key"
};
export default config;