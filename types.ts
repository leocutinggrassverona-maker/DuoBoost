export interface PricingModel {
  gemsPer1000: number;
  xpPer1000: number;
  streakPerUnit: number;
}

export interface OrderState {
  gems: number;
  xp: number;
  streaks: number;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}
