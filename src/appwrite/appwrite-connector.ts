import { Client } from "appwrite";
import appwriteConfig from "../configs/appwrite.config";

export const appwriteClient = new Client();
    appwriteClient
      .setEndpoint(appwriteConfig.appwriteUrl)
      .setProject(appwriteConfig.appwriteProjectId);
