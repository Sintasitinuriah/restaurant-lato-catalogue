// import { Workbox } from 'workbox-window';

// const swRegister = async () => {
//   if (!('serviceWorker' in navigator)) {
//     console.log('Service Worker not supported in the browser');
//     return;
//   }

//   const wb = new Workbox('/sw.bundle.js');

//   wb.addEventListener('activated', (event) => {
//     if (!event.isUpdate) {
//       console.log('Service worker activated for the first time.');
//     }
//   });

//   wb.addEventListener('waiting', (event) => {
//     wb.addEventListener('controlling', (event) => {
//       window.location.reload();
//     });

//     wb.messageSkipWaiting();
//   });

//   try {
//     await wb.register();
//     console.log('Service worker registered');
//   } catch (error) {
//     console.log('Failed to register service worker', error);
//   }
// };

// export default swRegister;

import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }

  const wb = new Workbox('/sw.bundle.js');

  wb.addEventListener('activated', (event) => {
    if (!event.isUpdate) {
      console.log('Service worker activated for the first time.');
    } else {
      console.log('Service worker updated.');
    }
  });

  wb.addEventListener('waiting', (event) => {
    wb.addEventListener('controlling', (event) => {
      window.location.reload();
    });

    wb.messageSkipWaiting();
  });

  try {
    await wb.register();
    console.log('Service worker registered');
  } catch (error) {
    console.log('Failed to register service worker', error);
  }
};

export default swRegister;
