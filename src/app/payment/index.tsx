import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { CreditCard, CARD_SIDE } from "@/app/components/credit-card";
import { useSharedValue } from "react-native-reanimated";
import { Input } from "../components/input";
import { useState } from "react";
export function Payment() {
  const cardSide = useSharedValue(CARD_SIDE.front);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  function showFrontCard() {
    cardSide.value = CARD_SIDE.front;
  }
  function showBackCard() {
    cardSide.value = CARD_SIDE.back;
  }

  function handleFlipCard() {
    if (cardSide.value === CARD_SIDE.front) {
      showBackCard();
    } else {
      showFrontCard();
    }
  }

  return (
    <View style={styles.container}>
      <CreditCard
        cardSide={cardSide}
        data={{
          name,
          number: number.replace(/(\d{4})(?=\d)/g, "$1 "),
          expiration,
          cvv,
        }}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleFlipCard}
      >
        <Text>Inverter</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <Input
          placeholder="Cardholder Name"
          onChangeText={setName}
          onFocus={showFrontCard}
        />
        <Input
          placeholder="Card number"
          keyboardType="numeric"
          maxLength={16}
          onChangeText={setNumber}
          onFocus={showBackCard}
        />
        <View style={styles.inputInline}>
          <Input
            placeholder="Expiration"
            onChangeText={setExpiration}
            style={styles.smallInput}
            onFocus={showBackCard}
          />
          <Input
            placeholder="CVV"
            maxLength={3}
            style={styles.smallInput}
            keyboardType="numeric"
            onChangeText={setCvv}
            onFocus={showBackCard}
          />
        </View>
      </View>
    </View>
  );
}
