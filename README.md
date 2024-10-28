# PWA Install Bar

Uma biblioteca simples para adicionar uma barra de instalação de PWA com detecção de plataforma.

## Instalação

```html
<script src="https://cdn.jsdelivr.net/npm/pwa-install-bar@1.0.0/dist/pwa-install-bar.js"></script>
```

## Uso

```javascript
new PWAInstallBar({
    appName: 'Seu App',
    appUrl: 'app.seudominio.com',
    androidInstructions: '/android.jpg',
    iosInstructions: '/ios.jpg'
});
```

## Configurações

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| appName | string | 'My PWA App' | Nome do seu aplicativo |
| appUrl | string | window.location.host | URL do seu aplicativo |
| appIcon | string | null | URL do ícone do app |
| androidInstructions | string | '/android-instructions.jpg' | Imagem de instruções para Android |
| iosInstructions | string | '/ios-instructions.jpg' | Imagem de instruções para iOS |
| backgroundColor | string | '#000000' | Cor de fundo da barra |
| buttonColor | string | '#9AE6B4' | Cor do botão |
| textColor | string | '#FFFFFF' | Cor do texto |
| buttonText | string | 'Instalar' | Texto do botão |
| zIndex | number | 9999 | Z-index da barra |
