export default {
  FAILED_LOAD_DATA: "There is an error while loading your data. Please check the \"apiKey\".",
  EMPTY_LOCALES: "You haven't had any locales yet. Please visit \"https://remote-i18n.vercel.app/\", open your project and create one.",
  MISSING_LOCALE: (locale: string) => `Locale "${locale}" is missing in your project. Please visit \"https://remote-i18n.vercel.app/\", open your project and create it.`
}