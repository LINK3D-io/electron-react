import { NFC } from 'nfc-pcsc';
import nfcCard from 'nfccard-tool';
import { v4 as uuidv4 } from 'uuid';
import request from './request';
import { login } from './auth';
import { addTag } from './tags';

const nfc = new NFC();

nfc.on('reader', async (reader) => {
  // Login to server
  const user = 'jon';
  const { credentials } = await login(user, 'catcatcat');
  if (credentials) {
    request.setAccessToken(credentials.access);
  }

  console.log('credentials:', credentials);

  console.log(`${reader.reader.name}  device attached`);

  reader.on('card', async (card) => {
    console.log(`card detected`, card);

    /**
     * Write a card
     */

    try {
      /**
       *  1 - READ HEADER
       *  Read header: we need to verify if we have read and write permissions
       *               and if prepared message length can fit onto the tag.
       */
      const cardHeader = await reader.read(0, 20);

      const tag = nfcCard.parseInfo(cardHeader);
      console.log('tag info:', JSON.stringify(tag));
      const uniqueId = uuidv4();

      /**
       * 2 - WRITE A NDEF MESSAGE AND ITS RECORDS
       */
      const message = [
        { type: 'uri', uri: `https://link3d.io/tag/${uniqueId}` },
      ];

      // Prepare the buffer to write on the card
      const rawDataToWrite = nfcCard.prepareBytesToWrite(message);

      // Write the buffer on the card starting at block 4
      const preparationWrite = await reader.write(
        4,
        rawDataToWrite.preparedData,
      );

      // Success !
      if (preparationWrite) {
        console.log('Data have been written successfully.');
        // Add tag to server
        const result = await addTag(credentials.id, uniqueId);
        console.log('result:', result);
      }
    } catch (err) {
      console.error(`error when reading data`);
    }

    /**
     * Read a card
     */

    try {
      /**
       * READ MESSAGE AND ITS RECORDS
       */

      /**
       *  1 - READ HEADER
       *  Read from block 0 to block 4 (20 bytes length) in order to parse tag information
       */
      // Starts reading in block 0 until end of block 4
      const cardHeader = await reader.read(0, 20);

      const tag = nfcCard.parseInfo(cardHeader);
      console.log('tag info:', JSON.stringify(tag));

      /**
       *  2 - Read the NDEF message and parse it if it's supposed there is one
       */

      // There might be a NDEF message and we are able to read the tag
      if (
        nfcCard.isFormatedAsNDEF() &&
        nfcCard.hasReadPermissions() &&
        nfcCard.hasNDEFMessage()
      ) {
        // Read the appropriate length to get the NDEF message as buffer
        const NDEFRawMessage = await reader.read(
          4,
          nfcCard.getNDEFMessageLengthToRead(),
        ); // starts reading in block 0 until 6

        // Parse the buffer as a NDEF raw message
        const NDEFMessage = nfcCard.parseNDEF(NDEFRawMessage);

        console.log('NDEFMessage:', NDEFMessage);
      } else {
        console.log(
          'Could not parse anything from this tag: \n The tag is either empty, locked, has a wrong NDEF format or is unreadable.',
        );
      }
    } catch (err) {
      console.error(`error when reading data`);
    }
  });

  reader.on('card.off', (card) => {
    console.log(`${reader.reader.name}  card removed`, card);
  });

  reader.on('error', (err) => {
    console.log(`${reader.reader.name}  an error occurred`, err);
  });

  reader.on('end', () => {
    console.log(`${reader.reader.name}  device removed`);
  });
});

nfc.on('error', (err) => {
  console.log('an error occurred', err);
});
