import _ from 'lodash';

export class SignalrMessage {
  public clientId: string | null = null;
  public messageId: string | null = null;
  public userName: string | null = null;
  public type: string | null = null;
  public contents: string | null = null;
  public timestamp: Date | null = null;

  constructor(data?: SignalrMessage) {
    if (_.isEmpty(data)) {
      _.merge(this, data);
    }
  }
}
