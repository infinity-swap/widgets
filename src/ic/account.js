import { sha224 } from "js-sha256";
import crc from "crc";
import { Buffer } from "buffer";
import { Principal } from "@dfinity/principal";

// 4 bytes
export const calculateCrc32 = (bytes) => {
  const checksumArrayBuf = new ArrayBuffer(4);
  const view = new DataView(checksumArrayBuf);
  view.setUint32(0, crc.crc32(Buffer.from(bytes)), false);
  return Buffer.from(checksumArrayBuf);
};

export const asciiStringToByteArray = (text) => {
  return Array.from(text).map((c) => c.charCodeAt(0));
};

export const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

export class AccountIdentifier {
  constructor(bytes) {
    this.bytes = bytes;
  }

  static fromHex(hex) {
    return new AccountIdentifier(Uint8Array.from(Buffer.from(hex, "hex")));
  }

  static fromPrincipal(principal, subAccount = SubAccount.zero()) {
    // Hash (sha224) the principal, the subAccount and some padding
    const padding = asciiStringToByteArray("\x0Aaccount-id");

    const shaObj = sha224.create();
    shaObj.update([
      ...padding,
      ...principal.toUint8Array(),
      ...subAccount.toUint8Array(),
    ]);
    const hash = new Uint8Array(shaObj.array());

    // Prepend the checksum of the hash and convert to a hex string
    const checksum = calculateCrc32(hash);
    const bytes = new Uint8Array([...checksum, ...hash]);
    return new AccountIdentifier(bytes);
  }

  toHex() {
    return toHexString(this.bytes);
  }
}

export class SubAccount {
  constructor(bytes) {
    this.bytes = bytes;
  }

  static zero() {
    return new SubAccount(new Uint8Array(32).fill(0));
  }

  static fromBytes(bytes) {
    if (bytes.length !== 32) {
      return Error("Subaccount length must be 32-bytes");
    }

    return new SubAccount(bytes);
  }

  static fromPrincipal(principal) {
    const bytes = new Uint8Array(32).fill(0);

    let principalId = principal;
    if (!(principal instanceof Principal)) {
      principalId = Principal.from(principal);
    }

    const principalBytes = principalId.toUint8Array();
    bytes[0] = principalBytes.length;

    for (let i = 0; i < principalBytes.length; i += 1) {
      bytes[1 + i] = principalBytes[i];
    }

    return new SubAccount(bytes);
  }

  toUint8Array() {
    return this.bytes;
  }

  toArray() {
    return Array.from(this.bytes);
  }
}
