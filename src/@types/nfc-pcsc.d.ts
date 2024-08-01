declare module 'nfc-pcsc' {
  import { EventEmitter } from 'events';

  export interface Reader extends EventEmitter {
    reader: {
      name: string;
    };

    on(
      event: 'card',
      listener: (card: { atr: Buffer; standard: string }) => void,
    ): this;

    on(event: 'error', listener: (err: Error) => void): this;

    on(event: 'end', listener: () => void): this;
  }

  export class NFC extends EventEmitter {
    on(event: 'reader', listener: (reader: Reader) => void): this;

    on(event: 'error', listener: (err: Error) => void): this;
  }
}
