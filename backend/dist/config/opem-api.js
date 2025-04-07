import { Configuration } from "openai";
import { appCOnfigurations } from "./app.config.js";
export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: appCOnfigurations.OPEN_AI_SECRET,
        organization: appCOnfigurations.ORGANIZATION_ID,
    });
    return config;
};
//# sourceMappingURL=opem-api.js.map