import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("The user UID does not exist");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });
    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }
    const photosUrl = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrl));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
