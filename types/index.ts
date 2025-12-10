export interface Card {
  id: number;
  icon: string;
  text: string;
  expectedSwipe: 'left' | 'right';
  matchMessage: string;
}

export interface CardsData {
  cards: Card[];
  conclusion: {
    title: string;
    message: string;
  };
}

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

