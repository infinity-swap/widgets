import {
  Actor,
  ActorSubclass,
  Identity,
  ActorMethod,
  HttpAgent,
} from "@dfinity/agent";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { IC_ENVIRON, IC_HOST } from "../shared/constants";

interface IcConnectorOptions {
  host?: string;
  identity?: Identity | undefined;
}

export class IcConnector {
  private host: string;
  private identity: Identity | undefined;
  private agent: HttpAgent;

  constructor(options: IcConnectorOptions | undefined = {}) {
    this.host = options.host ?? IC_HOST;
    this.identity = options.identity ?? undefined;
    this.agent = this.initAgent();
  }

  initAgent() {
    const agent = new HttpAgent({
      host: this.host,
      identity: this.identity,
    });
    if (IC_ENVIRON === "local") {
      agent.fetchRootKey();
    }
    return agent;
  }

  getAgent(): HttpAgent {
    return this.agent;
  }

  actor<T = Record<string, ActorMethod>>(
    cid: string | Principal,
    idl: IDL.InterfaceFactory
  ): ActorSubclass<T> {
    return Actor.createActor(idl, {
      agent: this.agent,
      canisterId: cid,
    });
  }
}

export default new IcConnector();
