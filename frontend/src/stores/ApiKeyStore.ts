import { create } from "zustand";

type ApiStore = {
    apikey: string | null;
    showLoadingBar: boolean;
    updateLoadingBar: (loadingBar: boolean) => void;
    updateApiKey: (myKey: string | null) => void;
}

export const ApiKeyStore = create<ApiStore>((set) => ({
    apikey: '',
    showLoadingBar: false,
    updateLoadingBar: (myLoadingBar: boolean) => set (() => ({showLoadingBar: myLoadingBar})),
    updateApiKey: (key: string | null) => set(() => ({apikey: key}))
}))
