const RedColor = {
  redPrimaryColor: "#c35247",
};
const BluewColor = {
  bluePrimaryColor: "#324C73",
  blueDarkColor: "#1A2226",
};
const LightBlueColor = {
  lightBluePrimaryColor: "#0DB8DE",
};
const BlackColor = {
  blackPrimaryColor: "black",
  blackSecondaryColor: "#222D32",
};
const GrayColor = {
  primaryGrayColor: "#495057",
};
const YellowColor = {
  yellowPrimaryColor: "#ffb838",
  warningColor: "#d7aa51",
};
const BaseColor = {
  ...YellowColor,
  ...RedColor,
  ...BluewColor,
  ...BlackColor,
  ...LightBlueColor,
  ...GrayColor,
  primaryColor: "#282c34",
  whiteColor: "#FFFFFF",
  fieldColor: "#F5F6FC",
};

export { BaseColor };
