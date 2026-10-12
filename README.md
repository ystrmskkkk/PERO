# PERO — нативное приложение (Capacitor)

Ветка `capacitor` — оболочка iOS/Android вокруг веб-версии PERO (папка `www/`, та же сборка, что на GitHub Pages, но без service worker: в приложении всё и так лежит внутри).

Нативные возможности (`window.Capacitor` в `www/index.html`):
- тактильный отклик на верный/неверный ответ и награды (`@capacitor/haptics`);
- напоминание в 19:00 «не прерви серию» (`@capacitor/local-notifications`), разрешение спрашивается после первого опыта;
- статус-бар поверх приложения (`@capacitor/status-bar`).

## Сборка в облаке
GitHub Actions на каждый пуш в эту ветку:
- **Android APK** — готовый `app-debug.apk` во вкладке Actions → запуск → Artifacts. Ставится на телефон напрямую.
- **iOS build check** — проверка, что проект собирается под симулятор. Для установки на iPhone и App Store нужна подпись (Apple Developer).

## Локально
```
npm install
npx cap add android   # или ios (нужен Mac с Xcode)
npx capacitor-assets generate
npx cap sync
npx cap open android  # или ios
```

## Обновление веб-части
Скопировать свежую сборку PERO в `www/` и выполнить `npx cap sync`.
