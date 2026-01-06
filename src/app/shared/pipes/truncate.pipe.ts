import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to truncate text to a specified length.
 */
@Pipe({ name: 'truncate', standalone: false })
export class TruncatePipe implements PipeTransform {

  // Transforms the input text by truncating it to the specified limit.
  transform(value: string | null, limit = 100): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    return value.substring(0, limit) + '...';
  }
}
