export const useClipBoard = () => {
  const copyToClipBoard = (value?: string | null): void => {
    !!value && navigator.clipboard.writeText(value)
      .then(() => {})
      // eslint-disable-next-line no-console
      .catch(() => console.error('Failed to copy', value));
  };

  return { copyToClipBoard };
};
