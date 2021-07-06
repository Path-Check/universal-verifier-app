import AsyncStorage from '@react-native-async-storage/async-storage';

const CARD_KEY_PREFIX = 'CARDS';
const PASSKEY_VACCINEE_PREFIX = 'HASH';

const listCards = async () => {
  try {
    let ks = await AsyncStorage.getAllKeys();
    let curated =  ks.filter((key) => key.startsWith(CARD_KEY_PREFIX));
    let cardsStr = await AsyncStorage.multiGet(curated);
    let cards = [];
    cardsStr.forEach((item) =>
        cards.push(JSON.parse(item[1]))
    );
    cards = cards.sort((a,b) => new Date(b.scanDate) - new Date(a.scanDate));
    return cards;
  } catch (err) {
    alert(err);
    return [];
  }
}

const removeCard = async (signature) => {
  const cards = await listCards();
  const toRemove = cards.filter(item => item.signature === signature);
  if (toRemove[0] && toRemove[0].hash) {

    // If the card to remove is PassKey, we leave associated cards, but remove
    // the dangling references.
    await AsyncStorage.removeItem(PASSKEY_VACCINEE_PREFIX + toRemove[0].hash);

    const removeHashReferences = cards.filter(item => item.passkey === toRemove[0].hash);
    removeHashReferences.forEach(async (item) => {
          let cardStr = await AsyncStorage.getItem(CARD_KEY_PREFIX + item.signature);
          console.log(cardStr);
          let card = JSON.parse(cardStr);
          card.vaccinee = null;
          item.vaccinee = null;
          await AsyncStorage.setItem(CARD_KEY_PREFIX + card.signature, JSON.stringify(card));
        }
    );
  }

  // Remove the target card.
  await AsyncStorage.removeItem(CARD_KEY_PREFIX + signature);
  console.log("RemoveItem" + signature);

  // Return the set of remaining cards.
  return cards.filter(item => item.signature !== signature);
}

const getVaccinee = async (card) => {
  // Linking PassKeys to other cards.
  if (card.cert && card.cert.passkey) {
    let vaccineeStr = await AsyncStorage.getItem(PASSKEY_VACCINEE_PREFIX + card.cert.passkey);
    if (vaccineeStr)
      return JSON.parse(vaccineeStr);
  }
  return null;
}

const saveCard = async (card) => {
  // Saving
  await AsyncStorage.setItem(CARD_KEY_PREFIX + card.signature, JSON.stringify(card));
}

const saveVaccinee = async (card) => {
  // Saving
  await AsyncStorage.setItem(PASSKEY_VACCINEE_PREFIX + card.hash, JSON.stringify(card));
}

export { listCards, removeCard, saveCard, getVaccinee, saveVaccinee }