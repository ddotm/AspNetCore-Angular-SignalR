import _ from 'lodash';

export class SignalrMessage {
  public clientUniqueId: string | null = null;
  public type: string | null = null;
  public contents: string | null = null;
  public timestamp: Date | null = null;

  constructor(data?: SignalrMessage) {
    if (_.isEmpty(data)) {
      _.merge(this, data);
    }
  }
}
