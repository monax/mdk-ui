'use client';

import { useEffect, useState } from 'react';

export function useDateFormat(day = 'DD', month = 'MM', year = 'YY', separator = '/') {
  const [format, setFormat] = useState([day, month, year].join(separator));

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    setFormat(
      Intl.DateTimeFormat(navigator.language)
        .format(new Date('2001-02-28 00:00:00'))
        .split(/[^0-9]/)
        .map((p) => {
          switch (Number.parseInt(p)) {
            case 2:
              return month;
            case 28:
              return day;
            default:
              return year;
          }
        })
        .join(separator),
    );
  }, [day, month, year, separator]);

  return format;
}
