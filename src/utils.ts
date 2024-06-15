import type { ReactNode } from 'react';
import type { ReplaceOptions } from './types';

const escapeRegex = /[/\-\\^$*+?.()|[\]{}]/g;

const escapeRegExp = (text: string) => {
  return text.replace(escapeRegex, '\\$&');
};

const diacriticsRegex = /[\u0300-\u036f]/g;

/**
 * @link https://stackoverflow.com/a/37511463
 * @param text
 * @returns
 */
const normalizeText = (text: string) =>
  text.normalize('NFD').replace(diacriticsRegex, '');

export const replace = (
  source: string,
  search: string,
  replacer: (value: string, index: number) => ReactNode,
  options: ReplaceOptions = {}
): ReactNode => {
  const { caseSensitive, autoEscape, normalize } = options;

  const sourceText = normalize ? normalizeText(source) : source;
  const searchText = normalize ? normalizeText(search) : search;

  const matches = sourceText.match(
    new RegExp(
      autoEscape ? escapeRegExp(searchText) : searchText,
      caseSensitive ? 'g' : 'gi'
    )
  );

  if (!matches?.length) return source;

  const parts = sourceText.split(new RegExp(matches.join('|'), 'g'));

  let currentPosition = 0;
  const result: ReactNode[] = [];

  for (let index = 0; index < parts.length; index++) {
    const part = parts[index]!;
    const endPartPosition = currentPosition + part.length;

    result.push(source.substring(currentPosition, endPartPosition));

    currentPosition = endPartPosition;

    if (matches && matches[index]) {
      const match = matches[index]!;
      const endMatchPosition = currentPosition + match.length;

      result.push(
        replacer(source.substring(currentPosition, endMatchPosition), index)
      );

      currentPosition = endMatchPosition;
    }
  }

  return result;
};
