import { CRYPTOS } from "../common/globals.js"

console.log("Opening CryptOpticon Settings page");

let autoValues = [];
for (let key in CRYPTOS) {
  autoValues.push( {
    "name": key,
    "abbreviation": CRYPTOS[key]
  } );
}

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">CRYPTO WATCHLIST</Text>}>
        <AdditiveList
          title="Select Crypto Currencies"
          settingsKey="crypto_watchlist"
          maxItems="20"
          addAction={
            <TextInput
              title="Add a Crypto Currency"
              label="Name"
              placeholder="Type something"
              action="Add Currency"
              onAutocomplete={(abbreviation) => {
                return autoValues.filter((option) =>
                  option.name.toLowerCase().startsWith(abbreviation.toLowerCase()));
              }}
            />
          }
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);