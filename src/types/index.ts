declare type Rate = {
  USD: number;
  EUR: number;
  JPY: number;
  CNY: number;
  KRW: number;
  VND: number;
};

declare type ActionStatus = 'idle' | 'loading' | 'success' | 'error';
export class ActionsResponse {
  status: ActionStatus;
  message: string;
  data: object | null;

  constructor(status: ActionStatus, message: string, data?: object) {
    this.status = status;
    this.message = message;
    this.data = data || null;
  }

  get() {
    return JSON.stringify(this);
  }

  static fromJSON(json: string) {
    const parsed = JSON.parse(json);
    return new ActionsResponse(parsed.status, parsed.message, parsed.data);
  }
}

export type { Rate, ActionStatus };
