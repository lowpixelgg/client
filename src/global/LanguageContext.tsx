import React, { createContext, useState, useEffect } from "react";
import langJson from "./Language.json";

type langKeys = keyof typeof langJson;

export type LangContextTypes = {
  setLanguage: React.SetStateAction<any>;
  langObj: typeof langJson["br"];
  language: langKeys;
};

type providerTypes = {
  children: React.ReactNode;
};

export const LanguageContext = createContext<LangContextTypes | null>(null);

export const LanguageProvider = ({ children }: providerTypes) => {
  const [language, setLanguage] = useState<langKeys>("br");
  const [langObj, setLangObj] = useState(langJson[language]);

  useEffect(() => {
    setLangObj(langJson[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ setLanguage, langObj, language }}>
      {children}
    </LanguageContext.Provider>
  );
};
