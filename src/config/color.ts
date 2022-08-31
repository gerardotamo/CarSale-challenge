const BluewColor = {
    bluePrimaryColor: "#324C73",
    blueDarkColor: "#1A2226"
}
const LightBlueColor= {
    lightBluePrimaryColor: "#0DB8DE",
}
const BlackColor = {
    blackPrimaryColor: "black",
    blackSecondaryColor: "#222D32"
}
const YellowColor ={
    yellowPrimaryColor: "#ffb838"
}
const BaseColor = {
    ...YellowColor,
    ...BluewColor,
    ...BlackColor,
    ...LightBlueColor,
    primaryColor: "#282c34",
    whiteColor: "#FFFFFF",
    fieldColor: "#F5F6FC",
}

export { BaseColor };