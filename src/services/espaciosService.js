import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Colección de espacios
const espaciosCollection = collection(db, 'espacios');

// Obtener todos los espacios
export const getEspacios = async () => {
  try {
    const snapshot = await getDocs(espaciosCollection);
    const espacios = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return espacios;
  } catch (error) {
    console.error('Error al obtener espacios:', error);
    throw error;
  }
};

// Obtener espacios por tipo
export const getEspaciosByType = async (type) => {
  try {
    const snapshot = await getDocs(espaciosCollection);
    const espacios = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(espacio => espacio.type === type);
    return espacios;
  } catch (error) {
    console.error('Error al obtener espacios por tipo:', error);
    throw error;
  }
};

// Obtener espacios disponibles
export const getEspaciosDisponibles = async () => {
  try {
    const snapshot = await getDocs(espaciosCollection);
    const espacios = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(espacio => espacio.available === true);
    return espacios;
  } catch (error) {
    console.error('Error al obtener espacios disponibles:', error);
    throw error;
  }
};

// Agregar nuevo espacio
export const addEspacio = async (espacio) => {
  try {
    const docRef = await addDoc(espaciosCollection, espacio);
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar espacio:', error);
    throw error;
  }
};

// Actualizar espacio
export const updateEspacio = async (id, espacio) => {
  try {
    const espacioRef = doc(db, 'espacios', id);
    await updateDoc(espacioRef, espacio);
    return true;
  } catch (error) {
    console.error('Error al actualizar espacio:', error);
    throw error;
  }
};

// Eliminar espacio
export const deleteEspacio = async (id) => {
  try {
    const espacioRef = doc(db, 'espacios', id);
    await deleteDoc(espacioRef);
    return true;
  } catch (error) {
    console.error('Error al eliminar espacio:', error);
    throw error;
  }
};
