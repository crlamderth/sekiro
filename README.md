# Sekiro · instalar en el móvil

Sekiro es una sola página web que guarda tus datos **en el propio dispositivo** (IndexedDB del navegador). Nada viaja a internet. Esta carpeta es la versión instalable: la misma app más el manifest, el service worker (para abrir sin conexión) y los iconos.

**Importante:** la web solo lleva código. Nunca subas aquí un archivo `sekiro-hoja-*.json` exportado: ahí van tus números.

## Por qué hace falta publicarla

En un iPhone, un archivo `.html` abierto desde Archivos se ve pero **no se puede usar**: Safari lo muestra como vista previa, sin ejecutar nada. Para escribir en la hoja, guardar datos y tener el icono en la pantalla de inicio, la app tiene que vivir en una dirección `https://`. GitHub Pages es gratis y sirve.

## Qué hay aquí

| Archivo | Para qué |
|---|---|
| `index.html` | La app completa (igual que `sekiro.html` más las etiquetas de instalación). Se regenera con `python3 _build/build.py`. |
| `manifest.webmanifest` | Nombre, icono y colores de la app instalada. |
| `sw.js` | Service worker: guarda la app para que abra sin conexión. Cambia `VERSION` en cada actualización. |
| `icon-*.png` | Iconos 192 y 512 px (y versión *maskable* para Android). |

## Publicar en GitHub Pages (una vez)

Hazlo desde una **ventana de incógnito** con la cuenta `crlamderth`.

1. github.com → **New repository** → nombre `sekiro` → **Public** → sin README → **Create repository**.
2. En la página vacía del repositorio, pulsa **uploading an existing file** y arrastra los archivos de esta carpeta (`index.html`, `manifest.webmanifest`, `sw.js`, los cuatro `icon-*.png` y este `README.md`). **Commit changes**.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*; Branch = `main`, carpeta `/ (root)` → **Save**.
4. Espera uno o dos minutos. La dirección es `https://crlamderth.github.io/sekiro/`.

## Instalar en el iPhone

1. Abre `https://crlamderth.github.io/sekiro/` en **Safari** (no en Chrome: en iPhone solo Safari instala).
2. Botón **Compartir** (el cuadrado con la flecha) → **Añadir a pantalla de inicio** → **Añadir**.
3. Abre Sekiro desde el icono. Esa es la app de verdad: pantalla completa, sin barra de direcciones, funciona sin conexión.

Dos avisos:

- La app del icono y la pestaña de Safari **no comparten datos**. Usa siempre el icono.
- **Exportar copia** (Ajustes) abre la hoja de compartir: elige **Guardar en Archivos**. Hazlo de vez en cuando; es tu única copia fuera del teléfono.

Android (Chrome): abre la dirección → menú ⋮ → **Instalar app** o **Añadir a pantalla de inicio**.

## Actualizar la app

1. Regenera con `python3 _build/build.py` (o pídeselo a Claude).
2. Cambia `VERSION` en `sw.js` (si no, el móvil puede seguir con la versión guardada).
3. En GitHub: **Add file → Upload files** → arrastra `index.html` y `sw.js` → Commit. Al abrir la app dos veces, ya está actualizada. Tus datos no se tocan.

## Pasar datos entre dispositivos

No hay sincronización (todo queda en cada aparato). **Exportar copia** en uno, **Importar copia** en el otro. Importar **sustituye** lo que haya en el destino (antes se guarda una copia automática y puedes deshacer).
