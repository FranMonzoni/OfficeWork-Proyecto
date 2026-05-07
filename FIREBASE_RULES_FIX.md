# 🔧 Solución al Error 400 - Configuración de Reglas Firebase

## 🚨 Problema Detectado
El error `Failed to load resource: the server responded with a status of 400` indica que las reglas de seguridad de Firestore están bloqueando el acceso a los datos.

## ✅ Solución Inmediata

### 1. Ve a Firebase Console
1. Abre [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `officework-ebb4f`
3. En el menú izquierdo, ve a **Firestore Database**
4. Haz clic en la pestaña **Reglas** (Rules)

### 2. Reemplaza las Reglas Actuales
Borra todo el contenido existente y pega estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura en la colección espacios
    match /espacios/{espacioId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'mauriciomonzoni@hotmail.com';
    }
    
    // Negar todo lo demás por defecto
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 3. Publica los Cambios
1. Haz clic en el botón **Publicar** (Publish)
2. Espera unos segundos para que las reglas se propaguen
3. Refresca la aplicación (F5)

## 🔍 Verificación

Después de configurar las reglas:
- ✅ La aplicación debería cargar los espacios sin errores
- ✅ Los usuarios públicos pueden ver los espacios
- ✅ Solo el admin puede modificar los espacios

## 🚀 Si el Error Persiste

1. **Verifica el proyecto**: Asegúrate de estar en `officework-ebb4f`
2. **Espera la propagación**: Las reglas pueden tardar hasta 1 minuto
3. **Limpia el caché**: Ctrl+Shift+R (o Cmd+Shift+R en Mac)
4. **Reinicia el servidor**: Detén y vuelve a iniciar `npm run dev`

## 📞 Soporte

Si el problema continúa:
- Revisa que la API key sea correcta en el archivo `.env`
- Verifica que el proyecto esté activo en Firebase
- Confirma que el email del admin sea exactamente `mauriciomonzoni@hotmail.com`

---

**Importante**: Las reglas deben estar configuradas correctamente para que la aplicación funcione. Sin estas reglas, Firestore rechazará todas las solicitudes con error 400.
