import React, { createContext, useState } from "react";
import langJson from "./Language.json";

export type LangContextTypes = {
  setLanguage: React.SetStateAction<any>;
  langObj: typeof langJson["br"];
};

type providerTypes = {
  children: React.ReactNode;
};

export const LanguageContext = createContext<LangContextTypes | null>(null);

type langKeys = keyof typeof langJson;

export const LanguageProvider = ({ children }: providerTypes) => {
  const [language, setLanguage] = useState<langKeys>("br");
  const [langObj, setLangObj] = useState(langJson[language]);

  return (
    <LanguageContext.Provider value={{ setLanguage, langObj }}>
      {children}
    </LanguageContext.Provider>
  );
};
