import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native';
import type {
  HighlightConfig,
  ReplaceOptions,
} from 'react-native-highlighted-text';
import { HighlightedText } from 'react-native-highlighted-text';
import { Switch } from './components/Switch';

type Options = ReplaceOptions & { search: string };

export default function App() {
  const [options, setOptions] = useState<Options>({
    search: '',
    caseSensitive: false,
    autoEscape: true,
    normalize: true,
  });

  const highlightConfig: HighlightConfig = {
    ...options,
    style: styles.highlight,

    // renderText: ({ style, text, index }) => (
    //   <View
    //     key={`${text}-${index}`}
    //     style={{
    //       borderWidth: 1,
    //       borderRadius: 2,
    //       borderColor: 'black',
    //       height: 16,
    //     }}
    //   >
    //     <Text style={style}>{text}</Text>
    //   </View>
    // ),
  };

  const setOption = <TKey extends keyof Options>(
    key: TKey,
    value: Options[TKey]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          defaultValue={options.search}
          onChangeText={(text) => setOption('search', text)}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          placeholder="Type something to highlight"
          autoFocus
          style={styles.input}
        />
        <Switch
          label="Case sensitive"
          value={options.caseSensitive}
          onValueChange={(value) => setOption('caseSensitive', value)}
        />
        <Switch
          label="Normalize"
          value={options.normalize}
          onValueChange={(value) => setOption('normalize', value)}
        />
        <Switch
          label="Auto escape"
          value={options.autoEscape}
          onValueChange={(value) => setOption('autoEscape', value)}
        />
        <HighlightedText
          highlight={highlightConfig}
          selectable
          text="Advérsarium aliquem consistat detracto, éxpéténdas ponderum posidonium utrisqué. Beatae pénitus pláne suum vendibiliora. Attingere careret curis eveniet, faciam firme fortitudinis mauris otiosum quodsi satisfacit situm umbram veró."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 8,
  },
  highlight: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    flexGrow: 1,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
  },
});
