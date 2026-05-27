import axios from "axios";
import { Contact} from "../types/contact";

const API = axios.create({
  baseURL: "http://localhost:3001/contacts",
});

export const getContacts = (search: string) =>
  API.get<Contact[]>(`?search=${search}`);

export const createContact = (data: Contact) =>
  API.post("/", data);

export const updateContact = (id: number, data: Contact) =>
  API.patch(`/${id}`, data);

export const deleteContact = (id: number) =>
  API.delete(`/${id}`);