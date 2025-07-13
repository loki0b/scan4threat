import { create } from "zustand";

type AnalysisStats = {
  [engine: string]: number | undefined
  harmless?: number
  malicious?: number
  suspicious?: number
  undetected?: number
  timeout?: number
}

type ApiStore = {
    apikey: string | null;
    showLoadingBar: boolean;
    responses: string;
    analysis: AnalysisStats | null;
    updateLoadingBar: (loadingBar: boolean) => void;
    updateApiKey: (myKey: string | null) => void;
    updateResponse: (resp: string) => void;
    updateAnalysis: (analize: AnalysisStats | null) => void;
}

export const ApiKeyStore = create<ApiStore>((set) => ({
    apikey: '',
    showLoadingBar: false,
    responses: '',
    analysis: null,
    updateLoadingBar: (myLoadingBar: boolean) => set (() => ({showLoadingBar: myLoadingBar})),
    updateApiKey: (key: string | null) => set(() => ({apikey: key})),
    updateResponse: (respo) => set(() => ({responses: respo})),
    updateAnalysis: (analizing) => set(() => ({analysis: analizing}))

}))
