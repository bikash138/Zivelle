export function formatDate(isoString: string) {
    const date = new Date(isoString);

    // Options to display date nicely
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleString('en-US', options);
  }