# Configuración de Reglas de Seguridad de Firebase

## 🔐 Solución al Error de Permisos

El error "Missing or insufficient permissions" ocurre porque las reglas de seguridad de Firestore por defecto no permiten el acceso anónimo.

## 📋 Pasos para Configurar

### 1. Abrir Consola Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `officework-ebb4f`
3. En el menú izquierdo, ve a **Firestore Database**
4. Haz clic en la pestaña **Reglas** (Rules)

### 2. Reemplazar Reglas Actuales
Borra las reglas existentes y pega estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública a la colección espacios
    match /espacios/{espacioId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'mauriciomonzoni@hotmail.com';
    }
    
    // Permitir lectura de toda la colección espacios
    match /espacios/{document=**} {
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

### 3. Publicar los Cambios
1. Haz clic en **Publicar** (Publish)
2. Confirma los cambios

## 🔒 Qué Hacen Estas Reglas

### ✅ **Permisos Públicos**
- **Lectura**: Cualquiera puede leer los espacios de coworking
- **Escritura**: Solo el administrador (`mauriciomonzoni@hotmail.com`) puede modificar

### 🛡️ **Seguridad**
- Los usuarios públicos solo pueden ver los espacios
- Solo el admin puede crear, editar o eliminar espacios
- Protección contra accesos no autorizados

## 🚀 Verificación

Después de configurar las reglas:

1. **Refresca la aplicación** (F5)
2. **Verifica la consola** del navegador
3. **Deberías ver** los espacios sin errores de permisos

## 🔄 Si el Error Persiste

1. **Verifica el email del admin** en las reglas
2. **Asegúrate** de publicar los cambios
3. **Espera unos minutos** para que las reglas se propaguen
4. **Limpia el caché** del navegador

## 📞 Soporte

Si continúan los problemas:
- Revisa que el proyecto sea `officework-ebb4f`
- Verifica que el email admin sea exactamente `mauriciomonzoni@hotmail.com`
- Asegúrate de estar en la pestaña "Reglas" y no en "Datos"
