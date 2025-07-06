import { create } from "zustand";

type FileType = {
    fileTypes: string;
    userFileType: File | string | null;
    defineFileType: (types: string) => void;
    updateFileType: (userFile: File | string | null) => void;
}

export const FileTypeStore = create<FileType>((set) => ({
    fileTypes: 'File',
    userFileType: null,
    defineFileType: (tp) => set(() => ({fileTypes: tp})),
    updateFileType: (file) => set(() => ({userFileType: file}))
}))