import { create } from "zustand";

type ApiStore = {
    apikey: string;
    updateApiKey: (myKey: string) => void;
}

export const ApiKeyStore = create<ApiStore>((set) => ({
    apikey: '',
    updateApiKey: (key: string) => set(() => ({apikey: key}))
}))
