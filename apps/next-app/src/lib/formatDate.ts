export function formatDate(isoString: string) {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleString('en-US', options);
  }