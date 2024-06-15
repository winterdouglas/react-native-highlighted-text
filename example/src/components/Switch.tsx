import type { FC } from 'react';
import type { SwitchProps as RNSwitchProps, TextProps } from 'react-native';
import { Pressable, Switch as RNSwitch, StyleSheet, Text } from 'react-native';

type SwitchProps = RNSwitchProps & {
  label: string;
  LabelProps?: TextProps;
};

export const Switch: FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  LabelProps,
  style,
  ...rest
}) => {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => onValueChange?.(!value)}
    >
      <Text numberOfLines={1} {...LabelProps}>
        {label}
      </Text>
      <RNSwitch value={value} onValueChange={onValueChange} {...rest} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flexShrink: 1,
  },
});
