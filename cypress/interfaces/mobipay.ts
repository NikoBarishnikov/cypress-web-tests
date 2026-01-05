// Используем export, чтобы интерфейсы были доступны в других файлах
export interface MobipayRequest {
    action: "info" | "pay";
    phone: string;
    amount: number;
    currency: "UAH" | "USD" | "EUR";
    cardCvv: string;
    card: string;
    cardExp: string;
    xref: string;
    _: number;
  }
  
  export interface MobipayResponse {
    status: string;
    err_msg?: string;
    data?: {
      paymentId: string;
      commissions: number;
    };
  }
