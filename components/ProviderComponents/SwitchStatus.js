import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";

const SwitchStatus = ({ handleSwitchChange }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  handleSwitchChange(isSwitchOn);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.statusStyle}>
      <Text style={{ marginTop: 10, fontSize: 17, marginRight: 15 }}>
        Available
      </Text>

      <Switch
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusStyle: {
    flexDirection: "row",
  },
});

export default SwitchStatus;
