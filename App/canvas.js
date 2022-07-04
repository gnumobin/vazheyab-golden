// window shade rectangles stroke
const rectVolumeY = 10;
const rectVolumeX = 13;

// get window shade canvas
const windowShade = document.querySelector("canvas#windowShade");
// Create CTX of canvas (window shade)
const WS_CTX = windowShade.getContext("2d");
// Create Window Shade

//? all Rectangles color
WS_CTX.fillStyle = "#CED9E3";
//* Create Rect one || window shade rectange one
WS_CTX.fillRect(rectVolumeX, rectVolumeY * 1, 4, 22);

//* Create Rect two || window shade rectange two
WS_CTX.fillRect(rectVolumeX, rectVolumeY * 4, 4, 22);

//* Create Rect two || window shade rectange two
WS_CTX.fillRect(rectVolumeX, rectVolumeY * 7, 4, 22);

//* Create Rect one || window shade rectange one
WS_CTX.fillRect(rectVolumeX, rectVolumeY * 10, 4, 22);

//* Create Rect two || window shade rectange two
WS_CTX.fillRect(rectVolumeX, rectVolumeY * 13, 4, 22);

//* Create Rect two || window shade rectange two
WS_CTX.fillRect(rectVolumeX, rectVolumeY * 16, 4, 22);

//* Create Rect one || window shade rectange one
WS_CTX.fillRect(rectVolumeX, rectVolumeY * 19, 4, 22);

//! Create Circle of the end window shade
WS_CTX.beginPath();
WS_CTX.arc(15, rectVolumeY * 23, 13, 0, Math.PI * 2, true);
WS_CTX.fillStyle = "#1CB0F688";
WS_CTX.fill();

//! Create Circle of the end window shade
WS_CTX.beginPath();
WS_CTX.arc(15, rectVolumeY * 23, 9, 0, Math.PI * 2, true);
WS_CTX.fillStyle = "#1CB0F6";
WS_CTX.fill();
