type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
const fontWeight = (family: string): FontWeight => {
  if (family == "bold") {
    return "800";
  }
  if (family == "KanitLight") {
    return "100";
  }
  if (family == "KanitMedium") {
    return "500";
  }
  if (family == "light" || family == "thin") {
    return "normal";
  }
  return "normal";
};

const KanitFont = {
  KanitLight: "KanitLight",
  KanitMedium: "KanitMedium",
  KanitExtraBold: "KanitExtraBold",
  KanitExtraLight: "KanitExtraLight",
  KanitBold: "KanitBold",
  KanitBlack: "KanitBlack",
  KanitItalic: "KanitItalic",
};

export const GetKanitFont = (
  family:
    | "KanitLight"
    | "KanitMedium"
    | "KanitExtraBold"
    | "KanitExtraLight"
    | "KanitBold"
    | "KanitBlack"
    | "KanitItalic"
): {
  fontFamily: string;
  fontWeight: FontWeight;
} => {
  return {
    fontFamily: KanitFont[family],
    fontWeight: fontWeight(family),
  };
};

export const GetFontWeight = (
  family:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
): {
  fontWeight: FontWeight;
} => {
  return {
    fontWeight: fontWeight(family),
  };
};
