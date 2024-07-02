import { View, Text } from "react-native";
import { styles } from "./styles";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type CreditCardProps = {
  cardSide: SharedValue<number>;
  data: {
    name: string;
    number: string;
    expiration: string;
    cvv: string;
  };
};

export enum CARD_SIDE {
  front = 0,
  back = 1,
}

export function CreditCard({ cardSide, data }: CreditCardProps) {
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [0, 180]
    );
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [180, 360]
    );
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });
  return (
    <View>
      <Animated.View style={[styles.card, styles.front, frontAnimatedStyle]}>
        <View style={styles.header}>
          <View style={[styles.circle, styles.logo]} />
          <Text>My Card</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.flag}>
            <View style={[styles.circle, styles.red]} />
            <View style={[styles.circle, styles.orange]} />
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, styles.back, backAnimatedStyle]}>
        <View>
          <Text style={styles.label}>Card number</Text>
          <Text style={styles.value}>{data.number}</Text>
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={styles.label}>Expiration</Text>
            <Text style={styles.value}>{data.expiration}</Text>
          </View>

          <View>
            <Text style={styles.label}>CVV</Text>
            <Text style={styles.value}>{data.cvv}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
