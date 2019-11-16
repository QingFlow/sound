import Tone from 'tone';
import { soundMap } from './piano.constants';

const mapFile = (name) => {
  return soundMap.get(name);
};

export class SoundLibrary {

  piano = {
    A2: mapFile('A2'),
    A3: mapFile('A3'),
    A4: mapFile('A4'),
    A5: mapFile('A5'),
    A6: mapFile('A6'),
    B2: mapFile('B2'),
    B3: mapFile('B3'),
    B4: mapFile('B4'),
    B5: mapFile('B5'),
    B6: mapFile('B6'),
    C2: mapFile('C2'),
    C3: mapFile('C3'),
    C4: mapFile('C4'),
    C5: mapFile('C5'),
    C6: mapFile('C6'),
    C7: mapFile('C7'),
    D0: mapFile('D0'),
    D1: mapFile('D1'),
    D2: mapFile('D2'),
    D3: mapFile('D3'),
    D4: mapFile('D4'),
    D5: mapFile('D5'),
    D6: mapFile('D6'),
    E2: mapFile('E2'),
    E3: mapFile('E3'),
    E4: mapFile('E4'),
    E5: mapFile('E5'),
    E6: mapFile('E6'),
    F2: mapFile('F2'),
    F3: mapFile('F3'),
    F4: mapFile('F4'),
    F5: mapFile('F5'),
    F6: mapFile('F6'),
    G2: mapFile('G2'),
    G3: mapFile('G3'),
    G4: mapFile('G4'),
    G5: mapFile('G5'),
    G6: mapFile('G6'),
  };

  baseUrl = 'https://file.qingflow.com/aqfHackers/piano/';
  onload = null;

  load(): any {
    return new Tone.Sampler(
      this.piano, {
      baseUrl: this.baseUrl,
      onload: this.onload
    }).toMaster();
  }

  constructor() { }
}
