import { Text } from "react-native";

export default function AppText({ style, ...props }) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "Poppins_400Regular" },
        style,
      ]}
    />
  );
}
