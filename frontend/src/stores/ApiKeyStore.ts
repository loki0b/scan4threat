import { create } from "zustand";

type ApiStore = {
    apikey: string | null;
    updateApiKey: (myKey: string | null) => void;
}

export const ApiKeyStore = create<ApiStore>((set) => ({
    apikey: '',
    updateApiKey: (key: string | null) => set(() => ({apikey: key}))
}))
