const appConfig = () => ({
  OPEN_AI_SECRET: getEnv("OPEN_AI_SECRET"),
  MONGODB_URL: getEnv("MONGODB_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  PORT: getEnv("PORT"),
  ACCESS_EXPIRY_TIME: getEnv("ACCESS_EXPIRY_TIME"),
  REFRESH_EXPIRY_TIME: getEnv("REFRESH_EXPIRY_TIME"),
});

const getEnv = (key: string, defaultValue: string = ""): string => {
  const value = process.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  return value;
};

export const appCOnfigurations = appConfig();
