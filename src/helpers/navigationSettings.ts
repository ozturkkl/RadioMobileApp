import { StyleSheet } from "react-native";
import colors from "./colors";

export interface navigationProps {
    navigation: {
        navigate: (arg0: string) => void
    },
    route?: object
}

export let navigationStyle = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        alignItems: "center",
        color: colors.mainText,
    }
})
