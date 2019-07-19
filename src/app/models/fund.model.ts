export class Fund {
    
}

export enum FundValue {
  ONE_LAKH = "upto 10 L INR",
  TEN_THIRTY_LAKH = "10 L - 30 L INR",
  THIRTY_FIFTY_LAKH = "30 L - 50 L INR",
  FIFTY_LAKH_ONE_CRORE = "50 L - 1 Cr INR",
  ONE_TWENTY_CRORE = "1 Cr - 20 Cr INR",
  TWENTY_FIFTY_CRORE = "20 Cr - 50 Cr INR",
  FIFTY_HUNDRED_CRORE = "50 Cr - 100 Cr INR",
}

export enum InvestorType {
    INDIVIDUAL_INVESTOR= 'Individual Investor',
    INCUBATOR= 'Incubator',
    FAMILY= 'Family Office',
    ANGEL_NETWORK= 'Angel Network'
  }