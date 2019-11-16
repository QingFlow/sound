export const numbers = [
  { key: '1', soundCode: 'C2', active: false },
  { key: '2', soundCode: 'D2', active: false },
  { key: '3', soundCode: 'E2', active: false },
  { key: '4', soundCode: 'F2', active: false },
  { key: '5', soundCode: 'G2', active: false },
  { key: '6', soundCode: 'A2', active: false },
  { key: '7', soundCode: 'B2', active: false },
  { key: '8', soundCode: 'C3', active: false },
  { key: '9', soundCode: 'D3', active: false },
  { key: '0', soundCode: 'E3', active: false }
];
export const lettersRow1 = [
  { key: 'Q', soundCode: 'F3', active: false },
  { key: 'W', soundCode: 'G3', active: false },
  { key: 'E', soundCode: 'A3', active: false },
  { key: 'R', soundCode: 'B3', active: false },
  { key: 'T', soundCode: 'C4', active: false },
  { key: 'Y', soundCode: 'D4', active: false },
  { key: 'U', soundCode: 'E4', active: false },
  { key: 'I', soundCode: 'F4', active: false },
  { key: 'O', soundCode: 'G4', active: false },
  { key: 'P', soundCode: 'A4', active: false }
];
export const lettersRow2 = [
  { key: 'A', soundCode: 'B4', active: false },
  { key: 'S', soundCode: 'C5', active: false },
  { key: 'D', soundCode: 'D5', active: false },
  { key: 'F', soundCode: 'E5', active: false },
  { key: 'G', soundCode: 'F5', active: false },
  { key: 'H', soundCode: 'G5', active: false },
  { key: 'J', soundCode: 'A5', active: false },
  { key: 'K', soundCode: 'B5', active: false },
  { key: 'L', soundCode: 'C6', active: false }
];
export const lettersRow3 = [
  { key: 'Z', soundCode: 'D6', active: false },
  { key: 'X', soundCode: 'E6', active: false },
  { key: 'C', soundCode: 'F6', active: false },
  { key: 'V', soundCode: 'G6', active: false },
  { key: 'B', soundCode: 'A6', active: false },
  { key: 'N', soundCode: 'B6', active: false },
  { key: 'M', soundCode: 'C7', active: false }
];
export const soundMap = new Map<string, string>([
  ['C2', 'a49.mp3'],
  ['D2', 'a50.mp3'],
  ['E2', 'a51.mp3'],
  ['F2', 'a52.mp3'],
  ['G2', 'a53.mp3'],
  ['A2', 'a54.mp3'],
  ['B2', 'a55.mp3'],

  ['C3', 'a56.mp3'],
  ['D3', 'a57.mp3'],
  ['E3', 'a48.mp3'],
  ['F3', 'a81.mp3'],
  ['G3', 'a87.mp3'],
  ['A3', 'a69.mp3'],
  ['B3', 'a82.mp3'],

  ['C4', 'a84.mp3'],
  ['D4', 'a89.mp3'],
  ['E4', 'a85.mp3'],
  ['F4', 'a73.mp3'],
  ['G4', 'a79.mp3'],
  ['A4', 'a80.mp3'],
  ['B4', 'a65.mp3'],

  ['C5', 'a83.mp3'],
  ['D5', 'a68.mp3'],
  ['E5', 'a70.mp3'],
  ['F5', 'a71.mp3'],
  ['G5', 'a72.mp3'],
  ['A5', 'a74.mp3'],
  ['B5', 'a75.mp3'],

  ['C6', 'a76.mp3'],
  ['D6', 'a90.mp3'],
  ['E6', 'a88.mp3'],
  ['F6', 'a67.mp3'],
  ['G6', 'a86.mp3'],
  ['A6', 'a66.mp3'],
  ['B6', 'a78.mp3'],

  ['C7', 'a77.mp3'],
]);
