# remote-i18n
Make coding I18n less stressful.

## Installation
```sh
npm install remote-i18n
# or
yarn add remote-i18n
# or
pnpm add remote-i18n
```

## How it works
1. Create a project and get the `apiKey` in [our tool](https://remote-i18n.vercel.app/projects)
2. Put the `apiKey` in `I18nProvider`'s props
3. Put your translation's `id` in `T`'s props (Whenever `T` component is rendered, it's `id` will be created automatically in the tool)
4. Update your translation in the tool
### Production mode
#### * With `I18nProvider`'s `data` props (Recommended)
You can download the JSON file in the tool and put it in `I18nProvider`'s `data` props. Since your client already has data, `remote-i18n` will not try to fetch data from remote anymore. It's better for SSR (no loading state, no empty translations).
#### * Without `I18nProvider`'s `data` props
Without `data` props, the `apiKey` is requried for `remote-i18n` to fetch data from remote (there will be a loading state and cannot be used for SSR).

## Example
https://stackblitz.com/edit/react-ts-wemcka?file=index.tsx
