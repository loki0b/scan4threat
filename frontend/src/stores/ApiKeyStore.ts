import { create } from "zustand";

type ApiStore = {
    apikey: string | null;
    showLoadingBar: boolean;
    response: string;
    analisys: string;
    updateLoadingBar: (loadingBar: boolean) => void;
    updateApiKey: (myKey: string | null) => void;
    updateResponse: (resp: string) => void;
    updateAnalisys: (analize: string) => void;
}

export const ApiKeyStore = create<ApiStore>((set) => ({
    apikey: '',
    showLoadingBar: false,
    response: '',
    analisys: '',
    updateLoadingBar: (myLoadingBar: boolean) => set (() => ({showLoadingBar: myLoadingBar})),
    updateApiKey: (key: string | null) => set(() => ({apikey: key})),
    updateResponse: (respo) => set(() => ({response: respo})),
    updateAnalisys: (analizing) => set(() => ({analisys: analizing}))

}))
