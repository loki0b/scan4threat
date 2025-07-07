import { create } from "zustand";

type ApiStore = {
    apikey: string | null;
    showLoadingBar: boolean;
    responses: string;
    analysis: string;
    updateLoadingBar: (loadingBar: boolean) => void;
    updateApiKey: (myKey: string | null) => void;
    updateResponse: (resp: string) => void;
    updateAnalysis: (analize: string) => void;
}

export const ApiKeyStore = create<ApiStore>((set) => ({
    apikey: '',
    showLoadingBar: false,
    responses: '',
    analysis: '',
    updateLoadingBar: (myLoadingBar: boolean) => set (() => ({showLoadingBar: myLoadingBar})),
    updateApiKey: (key: string | null) => set(() => ({apikey: key})),
    updateResponse: (respo) => set(() => ({responses: respo})),
    updateAnalysis: (analizing) => set(() => ({analysis: analizing}))

}))
