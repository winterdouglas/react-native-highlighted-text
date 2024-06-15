import type { FC } from 'react';
import { Text } from 'react-native';
import type { HighlightedTextProps } from './types';
import { replace } from './utils';

export const HighlightedText: FC<HighlightedTextProps> = (props) => {
  const {
    text,
    highlight,
    keyExtractor = (value, index) => `${value}-${index}`,
    ...rest
  } = props;

  const renderContent = () => {
    if (!text || !highlight || !highlight.search) {
      return text;
    }

    const {
      search,
      renderHighlight,
      style,
      caseSensitive = false,
      autoEscape = true,
      normalize = true,
    } = highlight;

    try {
      return replace(
        text,
        search,
        (value, index) => {
          const getKey = () => keyExtractor(value, index);

          if (renderHighlight) {
            return renderHighlight({ value, index, getKey, style });
          }

          return (
            <Text key={getKey()} style={style}>
              {value}
            </Text>
          );
        },
        { caseSensitive, autoEscape, normalize }
      );
    } catch (error) {
      return text;
    }
  };

  return <Text {...rest}>{renderContent()}</Text>;
};
