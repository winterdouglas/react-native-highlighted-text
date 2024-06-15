import type { ReactNode } from 'react';
import type { StyleProp, TextProps, TextStyle } from 'react-native';

export type ReplaceOptions = {
  caseSensitive?: boolean;
  autoEscape?: boolean;
  normalize?: boolean;
};

export type HighlightConfig = ReplaceOptions & {
  search: string;
  style?: StyleProp<TextStyle>;
  renderHighlight?: (props: {
    value: string;
    index: number;
    getKey: () => string;
    style: StyleProp<TextStyle>;
  }) => ReactNode;
};

export type HighlightedTextProps = Omit<TextProps, 'children'> & {
  text?: string;
  highlight?: HighlightConfig;
  keyExtractor?: (value: string, index: number) => string;
};
