1. settings > search > look for Tailwind CSS: Class Attributes > add ._styles._ to the list
   - this will make sure that all tailwind intellisense will work inside object which name is styles

- example:

```ts
const styles = {
  container: `bg-[#00BCD4] min-h-screen grid  items-top grid-cols-[1.2fr_1fr] bg- `,
  imgBox: ` bg-cover bg-bottom min-h-screen rounded-l-3xl  `,
};
```
